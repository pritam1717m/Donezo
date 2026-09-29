import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import startReminderJob from "./jobs/reminderJob.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res)=> {
    res.json({
        message: "Donezo is running",
    });
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async ()=> {
    try {
        await connectDB();
        startReminderJob();

        app.listen(PORT, ()=> {
        console.log(`Server is running on ${PORT}`); 
});
    } catch (error) {
      console.error("Failed to start server:", error.message);
       process.exit(1); 
    }
};

startServer();


