import React, { useState } from 'react'
import { AlarmClock } from 'lucide-react';
function ReminderPicker({value, onChange, toggle}) {
    
    const [reminderTime, setReminderTime] = useState("");
  return (
    <div className='relative'>
        {/* <button className="flex items-center gap-1 rounded-md border border-zinc-700  px-2.5 py-1.5 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-600 cursor-pointer"> */}
          {/* <AlarmClock className="h-4 w-4 text-gray-400" /> */}
          <label className={`flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-sm cursor-pointer transition ${toggle ? 'border-zinc-700  text-gray-500 hover:bg-gray-200 hover:scheme-light hover:text-gray-600 scheme-dark' : 'border-gray-700 bg-white text-gray-500 hover:bg-gray-100 scheme-light'} `}>
          <span>Reminders</span>  
          <input type='time'
        value={value} 
        onChange={(e)=>onChange(e.target.value)}
        className={`bg-transparent outline-none cursor-pointer ${toggle ? 'text-gray-500 ' : 'text-gray-500'}`}/>
        </label>
    </div>
  )
}

export default ReminderPicker