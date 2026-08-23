import { AlarmClock, ArrowUp, CheckIcon, EditIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import DatePicker from "./DatePicker";
import ReminderPicker from "./ReminderPicker";

function TaskForm({
  mode = "add",
  intialValue = "",
  intialDate = "",
  initialTime = "",
  onSubmit,
  onCancel,
  toggle,
  
}) {
  const [value, setValue] = useState(intialValue);
  const [showCalender, setShowCalender] = useState(intialDate);
  const [reminder, setReminder] = useState(initialTime);
 
  function handleSubmit() {
    if (value.trim() === "") {
      return alert("Write Your Task");
    }
    onSubmit(value.trim(), showCalender, reminder);
    setValue("");
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
    <div className="flex justify-center mt-10 p-4 w-full">
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-zinc-700  shadow-sm ">
        <textarea
          className={`autofocus w-full h-30 resize-none border-0 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-0 ${
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
            value={reminder}
            onChange={setReminder}
            toggle={toggle}/>
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
