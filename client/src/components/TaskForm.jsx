import { AlarmClock, ArrowUp, CheckIcon, EditIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import DatePicker from "./DatePicker";
import ReminderPicker from "./ReminderPicker";

function TaskForm({
  mode = "add",
  initialValue = "",
  initialDate = "",
  initialTime = "",
  onSubmit,
  onCancel,
  toggle,
  
}) {
  const [value, setValue] = useState(initialValue);
  const [showCalender, setShowCalender] = useState(initialDate);
  const [taskTime, setTaskTime] = useState(initialTime);
  const [reminderBefore, setReminderBefore] = useState(0);
 
  function handleSubmit() {
    if (value.trim() === "") {
      return alert("Write Your Task");
    }
    onSubmit(value.trim(), showCalender,taskTime, reminderBefore);
    setValue("");
    setShowCalender("");
    setTaskTime("");
    setReminderBefore(0);
  }

  function handleCancel() {
    if (mode === "edit") {
      onCancel();
      return;
    }
    if (value.trim() === "") {
      onCancel();
      return;
    }
    setValue("");
    setShowCalender("");
    setReminder("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center pt-4 px-4 mt-10 w-full">
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-zinc-700  shadow-sm ">
        <textarea
          className={`autofocus w-full max-w-xl ml-0 space-y-1 h-30 resize-none border-0 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-0 ${
    toggle
      ? "bg-[#07090B] text-zinc-300 placeholder:text-gray-500"
      : "bg-white text-gray-700 placeholder:text-gray-400"
  }`}
          value={value}
          placeholder={mode === "edit" ? "" : "Add task"}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className={`flex items-center justify-between border-t border-zinc-700 px-3 py-2.5 ${
    toggle
      ? "bg-[#07090B] text-white"
      : "bg-white text-gray-700"
  }`}>
          <div className="flex items-center gap-2 focus:outline-none focus:ring-0">
           <DatePicker 
           value={showCalender}
           onChange={setShowCalender}
           toggle={toggle}
            />
            <ReminderPicker
            value={taskTime}
            onChange={setTaskTime}
            toggle={toggle}/>

            <select
            value={reminderBefore}
            onChange={(e) => setReminderBefore(Number(e.target.value))}
            className="text-sm border rounded-md px-2 py-1">
              <option value={0}>No reminder</option>
              <option value={5}>5 minutes before</option>
              <option value={10}>10 minutes before</option>
              <option value={15}>15 minutes before</option>
              <option value={20}>20 minutes before</option>
              <option value={30}>30 minutes before</option>
              <option value={60}>1 hour before</option>
              <option value={1440}>1 day before</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
            >
              <XIcon className="h-7 w-7" strokeWidth={1} />
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center rounded-md bg-red-600 p-2 text-white transition hover:bg-red-700 cursor-pointer"
            >
              {mode === "edit" ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <ArrowUp className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
