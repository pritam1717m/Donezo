import React, { useState } from 'react'

function TaskContainer({ tasks, onDelete }) {

  return (
    <div className="flex flex-col items-center pt-4 w-full">
      <ul className="w-full max-w-xl list-[circle] list-inside space-y-1 text-lg pt-2 ml-0 px-4">
        {tasks?.map((task) => (
          <li key={task.id} className="mb-2 text-left pl-2"
          onClick={()=>onDelete(task.id)}>
            {task.task}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskContainer;