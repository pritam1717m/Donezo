import React from 'react'
import Donezo_logo from '../assets/Donezo_logo.png';
import {Link} from 'react-router-dom';
import ToggleTheme from './ToggleTheme';
function Navbar({toggle, onToggleBg}) {
  return (
    <nav className={`w-full border-b-2  ${toggle ? "border-white/10" : "border-gray-200"}`}>
    <div className='flex items-center justify-between'>
      <div className=''>
        <Link to='/' className='max-md:flex-1'>
         <img src={Donezo_logo}className='w-40 h-auto'  
         alt="Logo of Donezo app"  /> 
        </Link>
        
    </div>
    <div className='p-2 mr-5 rounded-md hover:bg-gray-100'>
      <ToggleTheme 
      toggle={toggle}
      onToggleBg={onToggleBg}
      />
    </div>
    </div>
    </nav>
  )
}

export default Navbar