import { CalendarDays } from 'lucide-react';
import React, { useState } from 'react'

function DatePicker({value, onChange, toggle}) {


  return (
    <div className='relative'>
      <label className={`flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-sm cursor-pointer transition ${toggle ? 'border-zinc-700  text-gray-500 hover:bg-gray-200 hover:scheme-light hover:text-gray-600 scheme-dark' : 'border-gray-700 bg-white text-gray-500 hover:bg-gray-100 scheme-light'} `}>
       
        <input type='date'
        value={value}
        onChange={(e)=>onChange(e.target.value)}
         className={`bg-transparent outline-none cursor-pointer ${toggle ? 'text-gray-500 ' : 'text-gray-500'}`}
       />
      </label> 
    </div>
  );
}

export default DatePicker