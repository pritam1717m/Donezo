import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskInput from '../components/TaskInput';
import TaskContainer from '../components/TaskContainer';
import AddTask from '../components/AddTask';

function Home() {
  const [inputs, setInputs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [toggle, setToggle] = useState(false);
    
  useEffect(() => {
    const saveTask = localStorage.getItem('tasks');
    if (saveTask) {
      setInputs(JSON.parse(saveTask));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(inputs));
  }, [inputs]);

  function addTodo(newTask) {
    setInputs((prev) => [...prev, newTask]);
  } 
  function deleteTodo(id) {
    setInputs((current) => 
      current.filter((input) => input.id !== id));
  }
  function startEditing(task){
  setEditId(task.id);
  setEditText(task.task);
  }
  function saveEdit(id){
    if(editText.trim() === "")
      return;
    setInputs((prev) => prev.map((task) => task.id ===id ? {...task, task: editText} : task));
    setEditId(null);
    setEditText("");
  }
 function cancelEdit(){
  setEditId(null);
  setEditText("");
 }

 function toggleBg(){
        setToggle((prev) => !prev);
    }
  return (
    <div className={`min-h-screen transition-colors duration-300 ${toggle 
      ? 
      "bg-[#07090B] text-white bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,255,0.08),transparent_35%)] bg-size:80px_80px" 
     : "bg-white text-gray-900"}`}>
      <Navbar 
      toggle={toggle}
      onToggleBg={toggleBg}/>
   
      <TaskContainer
        tasks={inputs}
        onDelete={deleteTodo}
        onAddTodo={addTodo}
        editId={editId}
        editText={editText}
        setEditText={setEditText}
        onStartEdit={startEditing}
        onEditTodo={saveEdit}
        onCancelEdit={cancelEdit}/>
    </div>
  );
}

export default Home;
