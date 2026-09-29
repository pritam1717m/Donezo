import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        
        task: {
            type: String,
            required :true,
            trim : true,
        },

        completed: {
            type: Boolean,
            default: false,
        },

        date: {
            type: String,
            default: "",
        },
        taskTime: {
            type: String,
            default: "",
        },

        reminderBefore: {
            type: Number,
            default: 0,
        },
        reminderSent: {
            type: Boolean,
            default: false,
        },
        
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;