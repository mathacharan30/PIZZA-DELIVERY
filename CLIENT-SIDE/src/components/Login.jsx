import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../slices/loginSLice";


export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const loginHander = (e) => {
    const user = {
      username: username,
      password: password,
    }
    // console.log(user);
    dispatch(loginUser(user));
  }

  const state = useSelector(state => state.loginuser);
  if (state.request) {
    return <h1>Just a second...</h1>
  }
  if (state.isError) {
    alert("Something went wrong try again");
  }
  if (state.success) {
    // return <div><h1>user logged in successfully</h1><button onClick={()=>logoutHandler()}>logout</button></div>
    return <Navigate to="/" />
  }

  return (
    <div className="w-1/4 h-1/2 m-auto mt-20 bg-white rounded-lg border border-primaryBorder shadow-default top:0 bottom:0 left:0 right:0">
      <div className="text-primary m-6">
        <div className="flex items-center mt-3 justify-center">
          <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
            Login to your account
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
            onChange={(e) => { setUsername(e.target.value) }}
            required
            value={username}
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
              value="Login"
              onClick={() => loginHander()}
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex items-center mt-3 justify-center">
          <button className={"justify-center text-blue-500 hover:underline"} onClick={() => navigate('/signup')}>
            Need to register? Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
}