import React, { useState } from 'react'
import { registerUser } from '../api/authApi.js';
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async(e) =>{
        e.preventDefault();

        try {
           const data = await registerUser({
            name,
            email,
            password
           });
           console.log(data);
            alert("Registration successful");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Registration failed");
        }
    };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#07090B] text-zinc-300 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,255,0.08),transparent_35%)] transition-colors duration-300'>
        <form onSubmit={handleRegister}
        className='w-full max-w-sm border border-zinc-700 rounded-xl p-6'>
            <h1 className='text-2xl font-semibold mb-6'>Register</h1>

            <input type='text'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder='Name'
            className='w-full mb-3 border rounded-md px-3 py-2'/>

            <input type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Email'
            className='w-full mb-3 border rounded-md px-3 py-2'/>
            
            <input type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Password'
            className='w-full mb-4 border rounded-md px-3 py-2'/>
            <button type='submit' className='w-full bg-orange-600 text-white rounded-md py-2 cursor-pointer'>Register</button>

            <p className='text-sm text-center mt-4 text-gray-500'>Already have an account?{" "}
                <Link to='/login' className='text-orange-600 hover:underline'>
                Login
                </Link>
            </p>
        </form>
    </div>
  )
}

export default Register;