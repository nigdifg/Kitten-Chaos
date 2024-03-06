import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {setUser, fetchHighscore} from "../redux/slices/userSlice"
import { useNavigate } from "react-router-dom";

export default function Login() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
    
        const dispatch = useDispatch()
        const navigate = useNavigate();
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            const response = await fetch(`http://localhost:5000/users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
    
            const json = await response.json();
    
            if (response.ok) {
                //Save user and token to local storage
                localStorage.setItem('user', JSON.stringify(json));
    
                //Set user in authcontext i.e dispatch action
                dispatch(setUser(json))
                dispatch(fetchHighscore())
            }
        }

    return (
        <>
        <div className="overflow-hidden text-2xl font-bold flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-black">
                
                Welcome to {' '}
                <span className='text-gray-800 bg-indigo-400 rounded-lg  translate-x-20'>

                Kitten Chaos!
                </span>
                </h1>
                <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-black">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 border p-10 rounded-xl border-gray-800 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="p-5 mb-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                        <button className='w-full text-sm' >

                        New user ?
                        <hr/> 
                         <a href="/signup" className="text-indigo-600 text-lg mt-10 hover:underline">Create an new account</a>
                        </button>

                    </div>
                </form>
            </div>
        </div>
        </>
    );
}