import cron from "node-cron";
import Task from "../models/Task.js";
import sendEmail from "../utils/sendEmail.js";
import { DateTime } from 'luxon';

const startReminderJob = ()=>{
    cron.schedule("* * * * *", async()=>{
        try {
            console.log("\n---Checking reminders---");
            
            const tasks = await Task.find({
                completed: false,
                reminderSent: false,
                reminderBefore: { $gt : 0},
                date: { $ne: ""},
                taskTime: {$ne: ""},
            }).populate("user", "name email");
                  console.log("Tasks found:", tasks.length);


            const now =  DateTime.now().setZone("Asia/Kolkata");
            console.log("Current time:", now.toFormat("yyyy-MM-dd HH:mm"));


            for (const task of tasks) {

        console.log("\nTask:", task.task);
        console.log("Date:", task.date);
        console.log("Task time:", task.taskTime);
        console.log("Reminder before:", task.reminderBefore);
        console.log("User email:", task.user?.email); 

                const taskDateTime = DateTime.fromISO(
                    `${task.date}T${task.taskTime}`,
                    {
                        zone: "Asia/Kolkata",
                    }
                );

                console.log(
          "Task datetime:",
          taskDateTime.toFormat("yyyy-MM-dd HH:mm")
        );

                const reminderTime = taskDateTime.minus({
                    minutes: task.reminderBefore,
                });

                console.log(
          "Reminder time:",
          reminderTime.toFormat("yyyy-MM-dd HH:mm")
        );
console.log("NOW ISO:", now.toISO());
console.log("REMINDER ISO:", reminderTime.toISO());
console.log("TASK ISO:", taskDateTime.toISO());

console.log(
  "now >= reminderTime:",
  now >= reminderTime
);

console.log(
  "now < taskDateTime:",
  now < taskDateTime
);
                if (now >= reminderTime && 
                    now < taskDateTime
                ) {
                    console.log("Reminder condition matched");

                   await sendEmail({
                    to: task.user.email,
                    subject: `Reminder: ${task.task}`,
                    text: `Hi ${task.user.name}, Your task "${task.task}" is scheduled for ${task.date} at ${task.taskTime}.`,
                   });

                   console.log("Email sent successfully"); 

                   task.reminderSent = true;
                   await task.save(); 

                     console.log("reminderSent changed to true");
                } else{
                    console.log("Reminder condition NOT matched"); 
                }
            }

        } catch (error) {
            console.error("Reminder job error:", error.message);
        }
    });
};

export default startReminderJob;