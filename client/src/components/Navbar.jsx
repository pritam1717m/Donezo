import React from 'react'
import Donezo_logo from '../assets/Donezo_logo.png';
import {Link} from 'react-router-dom';
function Navbar() {
  return (
    <div className='border-b-5 border-gray-300'>
        <Link to='/' className='max-md:flex-1'> <img src={Donezo_logo}className='w-40 h-auto'  alt="Logo of Donezo app"  /> 
        </Link>
    </div>
  )
}

export default Navbar