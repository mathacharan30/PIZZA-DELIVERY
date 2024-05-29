import React from "react";
import Logo from "../assets/food.png";
import {useNavigate} from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { PiHandbagSimple } from "react-icons/pi";
import { useSelector } from "react-redux";
export const Navbar=()=>{
    const cartstate=useSelector(state=>state.cart);
    const navigate=useNavigate();
    return(
        <>
            <div className="shadow-lg bg-white dark:bg-gray-900 dark:text-white duration-200 ">
                <div className="container">
                    <div className="flex flex-row gap-20 justify-between items-center">
                        <div className="flex flex-row">
                            <a href="http://localhost:5173/" className="flex flex-row justify-center items-center text-2xl sm:text-3xl font-bold">
                                <img src={Logo} alt="Foodie.com" className="w-20"/>Foodie.com
                            </a>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <input type="text" placeholder="search" className="py-2 px-4 text-xl focus:outline-primary transition-all rounded-full"/>
                            <FaSearch />
                        </div>
                        <div className="flex flex-row justify-center items-center">
                            <div className="flex gap-2 flex-row justify-center items-center hover:text-white hover:bg-primary rounded-full py-4 px-4">
                            <PiHandbagSimple className=""/>
                            <button  onClick={()=> navigate('/cart')}>Cart {cartstate.data.length}</button>
                            </div>
                            <button className="hover:text-white hover:bg-primary rounded-full py-4 px-4" onClick={()=> navigate('/login')}>Login</button>
                            <button className="hover:text-white hover:bg-primary rounded-full py-4 px-4" onClick={()=> navigate('/signup')}>Signup</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

