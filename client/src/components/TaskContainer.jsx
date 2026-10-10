import React, { useEffect, useState } from "react";
import { createTask, getTasks, updateTask, deleteTask } from "../api/taskApi";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Sidebar from "./Sidebar";

function TaskContainer({
  editId,
  onStartEdit,
  onCancelEdit,
  formMode,
  onCancelAdd,
  toggle
}) {

  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState("active");

  useEffect(()=> {
    const loadTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        
        return;
      }
      try {
        const data = await getTasks(token);
        console.log("GET TASKS RESPONSE:", data);
        
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:",error.response?.data || error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
        }
      }
    };
    loadTasks();
  },[]);

  const activeTasks = tasks.filter((task) => !task.completed);

  const completedTasks = tasks.filter((task) => task.completed);

  const activeCount = activeTasks.length;
  const completedCount = completedTasks.length;

  const handleCreateTask = async(text, date, taskTime, reminderBefore) => {
    try {
      const newTask = await createTask({
        task: text,
        date,
        taskTime,
        reminderBefore
      });
      setTasks((prevTasks)=>[ ...prevTasks, newTask]);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleEditTask = async (text, date, taskTime, reminderBefore) => {
    try {
      const updatedTask = await updateTask(editId, {
        task: text,
        date, 
        taskTime,
        reminderBefore,
      });
      setTasks((prevTasks) => 
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      ));
      onCancelEdit();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleToggleTask = async(id) => {
    try {
      const task = tasks.find((task) => task._id === id);

      if (!task) {
        return;
      }

      const updatedTask = await updateTask(id,{
        completed: !task.completed,
      });

      setTasks((prevTasks) => prevTasks.map((task) => task._id === updatedTask._id ? updatedTask : task));
    } catch (error) {
      console.error("Failed to update task:",error);
    }
  };

  const handleDeleteTask = async(id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar
      currentView={currentView}
      onChangeView={setCurrentView}
      activeCount={activeCount}
      completedCount={completedCount}
      toggle={toggle}
      />
    <main className="flex-1">
    <div className="flex flex-col items-center pt-4 w-full">
      {formMode === null && (
        <div>
          <TaskForm 
          mode="add" 
          onSubmit={handleCreateTask} 
          onCancel={onCancelAdd} 
          toggle={toggle}/>
        </div>
      )}
      {formMode === "add" && (
        <div>
          <TaskForm 
          mode="add" 
          onSubmit={handleCreateTask} 
          onCancel={onCancelAdd} />
        </div>
      )}
      {formMode === "edit" && (
        <div>
          <TaskForm
            mode="edit"
            initialValue={tasks.find((task) => task._id === editId)?.task || ""}
            initialDate={tasks.find((task) => task._id === editId)?.date || ""}
            initialTime={tasks.find((task) => task._id === editId)?.reminder || ""}
            onSubmit={handleEditTask}
            onCancel={onCancelEdit}
            toggle={toggle}
          />
        </div>
      )}
      <TaskList  
      tasks={currentView === 'active' ? activeTasks : completedTasks} 
      onDelete={handleDeleteTask} 
      onToggleTask={handleToggleTask}
      onStartEdit={onStartEdit} 
      toggle={toggle} />
    </div>
    </main>
    </div>
  );
}

export default TaskContainer;
