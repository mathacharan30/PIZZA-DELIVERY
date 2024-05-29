import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { MdDelete } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";
import {deletePizza,addPizza} from '../slices/cartSlice';

export const Cart=()=>{
    const cartState=useSelector(state=>state.cart);
    const cartItems=cartState.data;
    const dispatch=useDispatch();
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    const deletepizza=(item)=>{
        dispatch(deletePizza(item));
    }

    const addToCart = (Pizza, quantity, varient) => {
        if(quantity>10)
        {
            alert("You can not add more than 10 Pizzas of same category");
        }else if(quantity===0){
            dispatch(deletePizza(Pizza));
        }
        else{
            let cartItem = {
                name: Pizza.name,
                _id: Pizza._id,
                image: Pizza.image,
                varient: varient,
                quantity: quantity,
                prices: Pizza.prices,
                price: Pizza.prices[0][varient] * quantity
            }
            // let cartItems=cartState.data;
            // localStorage.setItem('cartItems',JSON.stringify(cartItems));
            dispatch(addPizza(cartItem));
        }
    }
    var total=cartItems.reduce((x,item)=>x+item.price,0);
    return (
        <div className="grid grid-cols-3  mx-24 gap-4 mt-10 mb-20">
            <div className="col-span-2 mx-5 gap-10">
                <h1 className=" flex text-4xl font-semibold items-center justify-center mb-4">My Cart</h1>
                <hr />
                {cartItems.map(item =>{
                    return <><div className="flex flex-row items-center justify-between my-4">
                                <div>
                                    <h1>{item.name} [{item.varient}]</h1>
                                    <h2>Price : {item.quantity}*{item.prices[0][item.varient]} ={item.price}Rs/-</h2>
                                    <h2 className="flex items-center gap-2"> Quantity <HiPlus onClick={()=>addToCart(item,item.quantity+1,item.varient)}/>{item.quantity}<HiMinus onClick={()=>addToCart(item,item.quantity-1,item.varient)}/></h2>
                                </div>
                                <div className="flex flex-row items-center justify-center gap-4">
                                    <img src={item.image} alt="Pizza image" className="h-32 w-40"/>
                                    <div >
                                    <MdDelete className="w-6 h-6" onClick={()=>deletepizza(item)}/>
                                    </div>
                                    
                                </div>
                            </div>
                            <hr/>
                            </>
                })}
            </div>
            <div className="col-span-1 h-4/5 items-center mx-20 text-2xl my-28 flex flex-col space-y-10">
                <div>Total : {total} Rs/-</div>
                <button className="hover:text-white hover:bg-primary rounded-full py-4 px-4" >
                    Order Now
                </button>
            </div>

        </div>
    )
}