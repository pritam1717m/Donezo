import cron from "node-cron";
import Task from "../models/Task.js";
import sendEmail from "../utils/sendEmail.js";
import { DateTime } from 'luxon';

export const runReminderCheck = async () => {
    const tasks = await Task.find({
        completed: false,
        reminderSent: false,
        reminderBefore: { $gt: 0 },
        date: { $ne: "" },
        taskTime: { $ne: "" },
    }).populate("user", "name email");
    const now = DateTime.now().setZone("Asia/Kolkata");

    for (const task of tasks) {
        const taskDateTime = DateTime.fromISO(`${task.date}T${task.taskTime}`, {
            zone: "Asia/Kolkata",
        });
        const reminderTime = taskDateTime.minus({
            minutes: task.reminderBefore,
        });
        if (now >= reminderTime && now < taskDateTime) {
            await sendEmail({
                    to: task.user.email,
                    subject: `Reminder: ${task.task}`,
                    text: `Hi ${task.user.name}, Your task "${task.task}" is scheduled for ${task.date} at ${task.taskTime}.`,
            });
            task.reminderSent = true;
            await task.save();
        }
    }
};

const startReminderJob = () => {
    cron.schedule("* * * * *", () => {
        runReminderCheck().catch((error) => {
            console.error("Reminder job error:", error);
        });
    });
};

export default startReminderJob;