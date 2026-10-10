import React, { useState } from 'react';
import { loginUser } from "../api/authApi.js";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleLogIn = async(e) => {
        e.preventDefault();

        try {
            const data = await loginUser({
                email,
                password
            });
            console.log(data);
            
            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
            alert("Login Successful");

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Login failed");
        }
    };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#07090B] text-zinc-300 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,255,0.08),transparent_35%)] bg-size:80px_80px transition-colors duration-300'>
        <form onSubmit={handleLogIn}
        className='w-full max-w-sm border border-zinc-700 rounded-xl p-6'>
            <h1 className='text-2xl font-semibold mb-6'>Login</h1>
            <div className='mb-4'>
                <label className='text-sm'>Email</label>
                <input type='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Enter email'
                className='w-full mt-1 border rounded-md px-3 py-2'/>
            </div>

            <div className='mb-4'>
                <label className='text-sm'>Password</label>
                <input type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Enter password'
                className='w-full mt-1 border rounded-md px-3 py-2'/>
            </div>

            <button type='submit' className='w-full bg-orange-600 text-white rounded-md py-2 cursor-pointer hover:bg-orange-700'>Login</button>

            <p className='text5-sm text-center mt-4 text-gray-500'>Don't have an account?{" "}
            <Link to='/register'
            className='text-orange-600 text-center hover:underline'>
                Register
            </Link>
            </p>
        </form>
    </div>
  )
}

export default Login;