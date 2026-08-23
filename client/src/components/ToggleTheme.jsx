import React, { useState } from 'react'
import { Moon, Sun } from 'lucide-react';
function ToggleTheme({toggle, onToggleBg}) {
 
   
  return (
    <div>
        <button onClick={onToggleBg} className='cursor-pointer'>
        {toggle ? (<Sun className='w-6 h-6 text-gray-200' strokeWidth={1}/>) : (<Moon className='w-6 h-6 text-gray-400' strokeWidth={1}/>)
        }
      </button>
        
    </div>
  )
}

export default ToggleTheme;