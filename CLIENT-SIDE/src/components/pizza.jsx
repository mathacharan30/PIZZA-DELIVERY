import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import {addPizza,deletePizza} from '../slices/cartSlice';

export const Pizza = ({ pizza }) => {
    const dispatch=useDispatch();
    const cartstate=useSelector(state=>state.cart);
    const [quantity, setQuantity] = useState(1);
    const [varient, setVarient] = useState("small");
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    let cartItems=cartstate.data;
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
    //first time when the function is rendered the cartitems empty array will be created in the 
    //local storage later it will be updated when we click on the add to cart button 
    //so it will be written 2 times once outside and again inside 
    //u can check this in the inspect->applications->localstorage
    const addToCart = (Pizza, quantity, varient) => {
        let cartItem = {
            name: Pizza.name,
            _id: Pizza._id,
            image: Pizza.image,
            varient: varient,
            quantity: quantity,
            prices: Pizza.prices,
            price: Pizza.prices[0][varient] * quantity
        }
        // let cartItems=cartstate.data;
        // localStorage.setItem('cartItems',JSON.stringify(cartItems));
        dispatch(addPizza(cartItem));
    }


    return (
        <Card className="mt-10 w-96" >
            <CardBody className="relative h-5 text-lg">
                <h1 className="font-semibold text-md">{pizza.name}</h1>
            </CardBody>
            <CardBody>
                <img src={pizza.image} alt="card-image" onClick={handleOpen} variant="gradient" />
                <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>{pizza.name}</DialogHeader>
                    <DialogBody className="flex flex-row  mx-16 gap-14 ">
                        <img src={pizza.image} alt="card-image" />
                        <div><p>{pizza.description}</p></div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Close</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </CardBody>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    <div className="flex flex-row items-center justify-normal gap-2">
                        <div className="flex flex-row items-center justify-normal gap-2 ">
                            <p>Sizes :</p>
                            <select className="border-black border-2 rounded-lg" value={varient} onChange={(e) => { setVarient(e.target.value) }}>
                                {pizza.varients.map(variant => {
                                    return <option value={variant}>{variant}</option>
                                })}
                            </select>
                        </div>
                        <div className="flex flex-row items-center justify-normal gap-2 ">
                            <p>Quantity:</p>
                            <select className="border-black border-2 rounded-lg" value={quantity} onChange={(e) => { setQuantity(e.target.value) }}>
                                {[...Array(10).keys()].map((x, i) => {
                                    return <option value={i + 1}>{i + 1}</option>
                                })}
                                {/* //this is how we use empty array to print indexes 
                            //x is object and i is index */}
                            </select>
                        </div>
                    </div>
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <div className="flex flex-row items-center justify-center gap-5">
                    <p className="text-md font-semibold">Price : {pizza.prices[0][varient] * quantity} Rs/-</p>
                    <Button onClick={()=>addToCart(pizza,quantity,varient)}>Add to cart</Button>
                </div>
            </CardFooter>
        </Card>
    )
} 

//<Button onClick={()=>addToCart(pizza,quantity,varient)}>Add to cart</Button>
//the onclick function in js tha should be wrapped like an arrow function if we are passing the parameters to the function
//or it will be called without clicking the button 
// so it is important to wrap it 