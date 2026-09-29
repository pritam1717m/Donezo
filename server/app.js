import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from "./config/db.js";
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

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

await connectDB();

export default app;


