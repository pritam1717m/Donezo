import { Circle, CircleCheck } from 'lucide-react';
import React, { useState } from 'react'

function TaskContainer({ tasks, onDelete }) {
const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="flex flex-col items-center pt-4 w-full">
      <ul className="w-full max-w-xl  list-inside space-y-1 text-lg pt-2 ml-0 px-4">
        {tasks?.map((task) => (
          <li key={task.id} className="mb-2 text-left pl-2 flex gap-2"
          onClick={()=>onDelete(task.id)}>
            <button onMouseEnter={()=> setHoveredId(task.id)}
            onMouseLeave={()=> setHoveredId(null)} className='text-gray-400 transition hover' >{hoveredId === task.id ? (<CircleCheck className='h-5.5 w-5.5' strokeWidth={1}/>) : (<Circle className='h-5.5 w-5.5' strokeWidth={1}/>)}</button>  
           <span className='text-sm'> {task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskContainer;