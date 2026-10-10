import React from "react";
import { Circle, CircleCheck } from "lucide-react";
function Sidebar({
  currentView,
  onChangeView,
  activeCount,
  completedCount,
  toggle,
}) {
  return (
    <aside
      className={`w-60 min-h-screen border-r p-4 ${toggle ? "bg-[#07090B] border-zinc-800 text-zinc-300" : "bg-white border-gray-200 text-gray-700"}`}
    >
      <h1 className="text-xl font-semibold mb-8">Donezo</h1>
      <nav className="space-y-2">
        <button
          onClick={() => onChangeView("active")}
          className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition cursor-pointer ${currentView === "active" ? (toggle ? "bg-zinc-800 text-orange-500 " : "bg-orange-50 text-orange-600") : toggle ? "hover:bg-zinc-900" : "hover:bg-gray-100"} `}
        >
          <div className="flex items-center gap-3">
            <Circle className="w-5 h-5" strokeWidth={1.5} />
            <span>Active Tasks</span>
          </div>
          <span className="text-xs">{activeCount}</span>
        </button>

        <button
          onClick={() => onChangeView("completed")}
          className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition cursor-pointer ${currentView === "completed" ? (toggle ? "bg-zinc-800 text-orange-500 " : "bg-orange-50 text-orange-600") : toggle ? "hover:bg-zinc-900" : "hover:bg-gray-100"} `}
        >
          <div className="flex items-center gap-3">
            <CircleCheck className="w-5 h-5" strokeWidth={1.5} />
            <span>Completed</span>
          </div>
          <span className="text-xs">{completedCount}</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
