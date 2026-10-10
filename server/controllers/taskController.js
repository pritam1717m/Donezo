import Task from "../models/Task.js";

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user._id,
        }).sort({ createdAt: 1});

        res.status(200).json(tasks);

    } catch (error) {
        console.error("Get tasks error:", error);
        
      res.status(500).json({
        message: "Failed to fetch tasks",
        error: error.message,
      });  
    }
};

const createTask = async (req, res) => {
    try {
        const {task, date, taskTime, reminderBefore } = req.body;

        if (!task || task.trim() === "") {
            return res.status(400).json({
                message: "Task is required",
            });
        }

        const newTask = await Task.create({
            user: req.user._id,
            task: task.trim(),
            date: date || "",
            taskTime: taskTime|| "",
            reminderBefore: reminderBefore || 0,
            reminderSent: false,
            completed: false,
        });
         
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Create task error:", error);
        
        res.status(500).json({
            message: "Failed to create task",
            error: error.message,
        });
    }
};
const updateTask = async(req, res) => {
    try {
        const { id } = req.params;

        
        const updateData = {...req.body};

        if (req.body.date !== undefined || 
            req.body.taskTime !== undefined ||
        req.body.reminderBefore !== undefined) {
            updateData.reminderSent = false;
        }

        const updatedTask = await Task.findByIdAndUpdate(
            {_id: id,
             user: req.user._id,  
            }, 

            updateData,{
                new: true,
                runValidators: true,
            }
        
        );
        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message,
        });
    }
};

const deleteTask = async (req,res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task",
            error: error.message,
        });
    }
};


export  { getTasks, createTask, updateTask, deleteTask };