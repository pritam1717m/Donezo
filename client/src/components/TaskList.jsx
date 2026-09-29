// import React, { useState } from "react";
// import { Circle, CircleCheck, EditIcon } from "lucide-react";

// import { formatTaskDate } from "../utils/dateUtils";
// import { formatTaskTime } from "../utils/timeUtils";

// function TaskList({ tasks, onDelete,onToggleTask, onStartEdit, toggle }) {
//   const [hoveredId, setHoveredId] = useState(null);

//   const formatReminderBefore = (minutes) => {
//     if (minutes === 1440) {
//       return "1 day before";
//     }
//     if (minutes === 60) {
//       return "1 hour before";
//     }

//     return `${minutes} minutes before`;
//   };

//   return (
//     <div className="flex flex-col items-center pt-4 w-full">
//       <ul className="w-full max-w-xl list-inside space-y-1 text-lg pt-2 ">
//         {tasks?.map((task) => (
//           <li
//             key={task._id}
//             className={`group mb-2 text-left  border rounded-md border-zinc-800 p-2 ${toggle ? 
//               'bg-[#121417] text-zinc-300' : 
//               'bg-white text-gray-900'}`}>
//             <div className="flex items-center justify-between gap-2">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => onToggleTask(task._id)}
//                   onMouseEnter={() => setHoveredId(task._id)}
//                   onMouseLeave={() => setHoveredId(null)}
//                   className="text-gray-400 transition hover:text-orange-600"
//                 >
//                   { task.completed ? (<CircleCheck className="h-5.5 w-5.5 text-gray-400" strokeWidth={1}/>) :
//                   hoveredId === task._id ? (
//                     <CircleCheck className={`h-5.5 w-5.5 `} strokeWidth={1} />
//                   ) : (
//                     <Circle className="h-5.5 w-5.5" strokeWidth={1} />
//                   )}
//                 </button>
                
//                 <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : ""}`}>
//                   {task.task}
//                   </span>

//                   {task.date && (
//                   <div className={`text-xs mt-1 ${task.completed ? "text-gray-400" 
//                   : toggle ? 'text-orange-500' 
//                   : 'text-orange-600'}`}>
//                     {formatTaskDate(task.date)}
//                   </div> 
//                 )}

//                 {task.reminder && (
//                   <div className={`text-xs mt-1 ${task.completed ? "text-gray-400" 
//                   : toggle ? 'text-orange-500' 
//                   : 'text-orange-600'}`}>
//                     {formatTaskTime(task.reminder)}
//                   </div>
//                 )}

               
//               </div>
//               <button
//                 onClick={() => onStartEdit(task)}
//                 className="
//                     hidden
//                     group-hover:block
//                     text-gray-400
//                     hover:text-gray-700
//                     cursor-pointer"
//               >
//                 <EditIcon className="h-5 w-5" strokeWidth={1} />
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TaskList;

import React, { useState } from "react";
import {
  Circle,
  CircleCheck,
  EditIcon,
  Bell,
} from "lucide-react";

import { formatTaskDate } from "../utils/dateUtils";
import { formatTaskTime } from "../utils/timeUtils";

function TaskList({
  tasks,
  onDelete,
  onToggleTask,
  onStartEdit,
  toggle,
}) {
  const [hoveredId, setHoveredId] = useState(null);

  const formatReminderBefore = (minutes) => {
    if (minutes === 1440) {
      return "1 day before";
    }

    if (minutes === 60) {
      return "1 hour before";
    }

    return `${minutes} minutes before`;
  };

  return (
    <div className="flex flex-col items-center pt-4 w-full">
      <ul className="w-full max-w-xl space-y-2 pt-2">
        {tasks?.map((task) => (
          <li
            key={task._id}
            className={`group border rounded-md border-zinc-800 p-3 ${
              toggle
                ? "bg-[#121417] text-zinc-300"
                : "bg-white text-gray-900"
            }`}
          >
            <div className="flex items-start justify-between gap-3">

              {/* Left side */}
              <div className="flex items-start gap-3">

                {/* Complete button */}
                <button
                  onClick={() => onToggleTask(task._id)}
                  onMouseEnter={() => setHoveredId(task._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`mt-0.5 transition cursor-pointer ${
                    task.completed
                      ? "text-gray-400"
                      : "text-gray-400 hover:text-orange-600"
                  }`}
                >
                  {task.completed ? (
                    <CircleCheck
                      className="h-5.5 w-5.5"
                      strokeWidth={1}
                    />
                  ) : hoveredId === task._id ? (
                    <CircleCheck
                      className="h-5.5 w-5.5"
                      strokeWidth={1}
                    />
                  ) : (
                    <Circle
                      className="h-5.5 w-5.5"
                      strokeWidth={1}
                    />
                  )}
                </button>

                {/* Task information */}
                <div>
                  <p
                    className={`text-sm ${
                      task.completed
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {task.task}
                  </p>

                  {/* Date + Time */}
                  <div className="flex items-center gap-3 mt-1">
                    {task.date && (
                      <span
                        className={`text-xs ${
                          task.completed
                            ? "text-gray-400"
                            : toggle
                            ? "text-orange-500"
                            : "text-orange-600"
                        }`}
                      >
                        {formatTaskDate(task.date)}
                      </span>
                    )}

                    {task.taskTime && (
                      <span
                        className={`text-xs ${
                          task.completed
                            ? "text-gray-400"
                            : toggle
                            ? "text-orange-500"
                            : "text-orange-600"
                        }`}
                      >
                        {formatTaskTime(task.taskTime)}
                      </span>
                    )}
                  </div>

                  {/* Reminder */}
                  {task.reminderBefore > 0 && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                      <Bell
                        className="h-3.5 w-3.5"
                        strokeWidth={1.5}
                      />

                      <span>
                        Reminder:{" "}
                        {formatReminderBefore(
                          task.reminderBefore
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Edit */}
              {!task.completed && (
                <button
                  onClick={() => onStartEdit(task)}
                  className="
                    hidden
                    group-hover:block
                    text-gray-400
                    hover:text-gray-700
                    cursor-pointer
                  "
                >
                  <EditIcon
                    className="h-5 w-5"
                    strokeWidth={1}
                  />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;