import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TaskInput from '../components/TaskInput'
import TaskContainer from '../components/TaskContainer';

function Home() {
  const [inputs, setInputs] = useState([]);

  useEffect(()=>{
    const saveTask = localStorage.getItem("tasks");
    if (saveTask) {
      setInputs(JSON.parse(saveTask));
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(inputs));
  },[inputs]);

  function addTodo(newTask){
    setInputs((prev) => [...prev, newTask]);
  }
  
  function deleteTodo(id){
    setInputs(inputs.filter((input) => input.id !== id));
  }
  return (
    <>
      <Navbar/>
      <TaskInput onAddTodo={addTodo}/>
      <TaskContainer tasks={inputs} 
      onDelete={deleteTodo}/>
    </>
  )
}

export default Home