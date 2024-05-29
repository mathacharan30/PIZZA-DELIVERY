import { useNavigate,redirect, Navigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { postUser } from "../slices/userSlice";

export const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch=useDispatch();

  const signup=()=>{
    const user={
      username:name,
      email:email,
      password:password,
    }
    // console.log(user);
    dispatch(postUser(user));
  }

  const state=useSelector(state=>state.user);
  if(state.request)
  {
    return <h1>Just a second...</h1>
  }
  if(state.isError)
  {
    alert("Something went wrong try again");
  }
  if(state.success)
  {
    return <Navigate to="/"/>
  }
    
  return (
    <div className="w-1/4 h-1/2 m-auto mt-20 bg-white rounded-lg border border-primaryBorder shadow-default top:0 bottom:0 left:0 right:0">
      <div className="text-primary m-6">
        <div className="flex items-center mt-3 justify-center">
          <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
            Signup
          </h1>
        </div>
        <form>
          <label className="text-left">Username:</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            className={
              "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            }
            onChange={(e) => { setName(e.target.value) }}
            required
            value={name}
          />
          <label className="text-left">Email:</label>
          <input
            name="Email"
            type="text"
            placeholder="Email"
            className={
              "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            }
            onChange={(e) => { setEmail(e.target.value) }}
            required
            value={email}
          />
          <label>Password:</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={
              "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            }
            onChange={(e) => { setPassword(e.target.value) }}
            required
            value={password}
          />
          <div className="flex items-center mt-3 justify-center">
            <button
              className={
                "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
              }
              value="Signup"
              onClick={()=>signup()}
            >
              Signup
            </button>
          </div>
        </form>
        <div className="flex items-center mt-3 justify-center">
          <button className={"justify-center text-blue-500 hover:underline"} onClick={() => navigate('/login')}>
            Have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}