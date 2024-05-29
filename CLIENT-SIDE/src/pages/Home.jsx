import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pizza } from '../components/pizza';
import { fetchPizzas } from '../slices/pizzaSlice';
import {logoutUser } from "../slices/loginSLice";

export const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPizzas());
    }, [])
    

    const logoutHandler=()=>{
        dispatch(logoutUser());
      }

    const state = useSelector(state => state.pizza);
    console.log(state);
    if (state.isLoading) {
        return <h1>Loading...</h1>
    }
    if (state.isError) {
        return <h1>Something went wrong...</h1>
    }
    return (
        <div className='grid xl:grid-cols-3 xl:ml-72 xl:mr-72 mt-5 md:grid-cols-1 md:ml-44 md:mr-20 lg:grid-cols-2 lg:ml-32 lg:mr-32 lg:gap-8'>


            {state.data && state.data.map(pizza => {
                return <div className='items-center justify-center' key={pizza._id}>
                    <div >
                        <Pizza pizza={pizza} />
                    </div>
                </div>
            })}
            <button onClick={()=>logoutHandler()}>logout</button>
        </div>
    )
}