import { PlusCircleIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";

function AddTask({onTaskAdded}) {
  const [isHovered, setIsHovered] = useState(false);
  //const [showAddButton, setShowAddButton] = useState(true);

  return (
    <div className="py-1 pt-2 ml-0 px-0">
    <button
        className="flex items-center gap-2 text-gray-400 hover:text-orange-700 px-3 py-1.5 text-sm w-full max-w-xl"
        onClick={onTaskAdded}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-lg leading-none">
          {isHovered 
          ? (<PlusCircleIcon className="fill-orange-700 text-white w-5 h-5" strokeWidth={2}/>)
           : (<PlusIcon className="w-5 h-5 text-orange-700" strokeWidth={2}/>)}
           </span>
        Add Task
      </button>
    </div>
  );
}

export default AddTask;
