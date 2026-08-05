import React, { useState } from 'react'
import {ArrowUp} from 'lucide-react';
function TaskInput({onAddTodo}) {
    const [input, setInput] = useState("");
    function handleInput(){
        if (input.trim() === "") {
            return alert("Please Enter What to Do")
        }

        const newTask = {
            id: Date.now(),
            task: input
        };
       onAddTodo(newTask) ;
        setInput("")
    }
  return (
    <div className='flex justify-center p-4 w-full'>
      <div className='w-full max-w-xl flex items-center gap-2'>
        <textarea
          type='text'
          placeholder='Add task'
          className='w-full h-30 border-2 border-gray-200 rounded-md focus:outline-none px-3 py-2'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleInput}
          className='bg-red-600 text-white rounded-md p-2 flex items-center justify-center hover:bg-red-700'
        >
          <ArrowUp className='w-5 h-5' />
        </button>
      </div>
    </div>
  )
}

export default TaskInput