import { CheckIcon, Circle, CircleCheck, EditIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import TaskInput from "./TaskInput";
import AddTask from "./AddTask";

function TaskContainer({ tasks, onDelete, onAddTodo, onEditTodo, editId, editText, setEditText, onStartEdit, onCancelEdit }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  

  return (
    <div className="flex flex-col items-center pt-4 w-full">
      <ul className="w-full max-w-xl list-inside space-y-1 text-lg pt-2 ml-0 px-4">
        {tasks?.map((task) => (
          <li
            key={task.id}
            className="group mb-2 text-left pl-2 border-b border-gray-200 p-2 "
          >
                {editId === task.id ? 
                (<div>
                <div className="flex w-full max-w-xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <textarea value={editText}
                  onChange={(e)=>setEditText(e.target.value)}
                  placeholder="Add task"
          className="w-full h-30 resize-none border-0 bg-transparent px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0" autoFocus/>
           <button
              onClick={onCancelEdit}
              className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
            >
              <XIcon className="h-7 w-7" strokeWidth={1} />
            </button>
          <button onClick={()=> onEditTodo(task.id)}
          className="flex items-center justify-center rounded-md bg-red-600 p-2 text-white transition hover:bg-red-700 cursor-pointer">
            <CheckIcon className="w-5 h-5" /></button>
                </div></div>
                  ): (<div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDelete(task.id)}
                  onMouseEnter={() => setHoveredId(task.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="text-gray-400 transition hover:text-orange-600"
                >
                  {hoveredId === task.id ? (
                    <CircleCheck className="h-5.5 w-5.5" strokeWidth={1} />
                  ) : (
                    <Circle className="h-5.5 w-5.5" strokeWidth={1} />
                  )}
                </button>
                  <span className="text-sm"   
                  >{task.task}</span>
              </div>
              <button onClick={()=> onStartEdit(task)}  className="
                    hidden
                    group-hover:block
                    text-gray-400
                    hover:text-gray-700
                  "><EditIcon className="h-5 w-5" strokeWidth={1}/></button>
            </div>)}
          </li>
        ))}
        {!isAddingTask && (
          <li>
            <AddTask onTaskAdded={()=> setIsAddingTask(true)}/>
          </li>
        )}
        {isAddingTask && (
          <li>
            <TaskInput 
            onAddTodo={onAddTodo}
            onTaskAdded={()=> setIsAddingTask(false)}
            onCancel={()=> setIsAddingTask(false)}/>
          </li>
        )}
      </ul>
    </div>
  );
}

export default TaskContainer;
