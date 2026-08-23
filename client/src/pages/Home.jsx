import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskContainer from '../components/TaskContainer';

function Home() {
  const [inputs, setInputs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [formMode, setFormMode] = useState(null);
    
  useEffect(() => {
    const saveTask = localStorage.getItem('tasks');
    if (saveTask) {
      setInputs(JSON.parse(saveTask));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(inputs));
  }, [inputs]);

  function addTodo(text, selectedDate, reminder) {
    const newTask = {
      id: Date.now(),
      task: text,
      date: selectedDate || "",
      reminder : reminder || null,
      completed: false,
    };
    setInputs((prev) => [...prev, newTask]);
    setFormMode(null);
    
  } 

  function deleteTodo(id) {
    setInputs((current) => 
      current.filter((input) => input.id !== id));
  }

  function startEditing(task){
  setEditId(task.id);
  setFormMode('edit');
  }

  function saveEdit(id, newText, selectedDate, reminder){
    setInputs((prev) => prev.map((task) => task.id ===id ? {
      ...task, 
      task: newText,
      date: selectedDate || task.date,
      reminder : reminder || null,
    } 
    : task
  ));
    setEditId(null);
    setFormMode(null);
  }

 function cancelEdit(){
  setEditId(null);
  setFormMode(null);
 }

 function openAddForm(){
  setEditId(null);
  setFormMode("add");
 }

 function cancelAdd(){
  setFormMode(null);
 }

 function toggleBg(){
        setToggle((prev) => !prev);
    }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${toggle 
      ? 
      "bg-[#07090B] text-zinc-300 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,255,0.08),transparent_35%)] bg-size:80px_80px" 
     : "bg-white text-gray-900"}`}>
      <Navbar 
      toggle={toggle}
      onToggleBg={toggleBg}
      />
  
      <TaskContainer
        tasks={inputs}
        onDelete={deleteTodo}
        onSubmit={addTodo}
        editId={editId}
        formMode={formMode}
        onStartEdit={startEditing}
        onEdit={saveEdit}
        onCancelEdit={cancelEdit}
        onCancelAdd={cancelAdd}
        onOpenAddForm={openAddForm}
        toggle={toggle}/>
      
    </div>
  );
}

export default Home;
