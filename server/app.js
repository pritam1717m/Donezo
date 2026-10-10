import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { timingSafeEqual } from "node:crypto";

import connectDB from "./config/db.js";
import { runReminderCheck } from "./jobs/reminderJob.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();


app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
})
);
app.use(express.json());


app.get("/", (req, res)=> {
    res.json({
        message: "Donezo API is running",
    });
});

app.get("/api/cron/reminders", async (req, res) => {
    const secret = process.env.CRON_SECRET;
    const authorization = req.get("authorization") || "";
    const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";

    if (!secret) {
        return res.status(500).json({ message: "CRON_SECRET is not configured" });
    }

    const expected = Buffer.from(secret);
    const provided = Buffer.from(token);
    if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
        return res.sendStatus(401);
    }

    try {
        await runReminderCheck();
        return res.json({ message: "Reminder check completed" });
    } catch (error) {
        console.error("Reminder check failed:", error);
        return res.status(500).json({ message: "Reminder check failed" });
    }
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

await connectDB();

export default app;
