import React, { useState } from 'react'
import { Moon, Sun } from 'lucide-react';
function ToggleTheme({toggle, onToggleBg}) {
 
   
  return (
    <div>
        <button onClick={onToggleBg}>
        {toggle ? (<Moon className='w-6 h-6 text-gray-600' strokeWidth={1}/>) :
        (<Sun className='w-6 h-6 text-gray-600' strokeWidth={1}/>)}
      </button>
        
    </div>
  )
}

export default ToggleTheme;