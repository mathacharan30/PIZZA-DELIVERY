import { createSlice } from "@reduxjs/toolkit";

const data=localStorage.getItem('cartItems') ?JSON.parse(localStorage.getItem('cartItems')):[];
//here we need the localstorage for storing the cart data 
//this helps when the page is reloaded the items in the cart will be present as it is 
//first we will store the data array in the local storage then pass that as the initial state 
//the local storage will have string type which we will convert that to the json type and pass that to the data array
//we are adding the items to local storage as well in the pizza component when we dispatch the action
const initialState={
    data,
};

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addPizza:(state,action)=>{
            const alreadyPresent=state.data.find((pizza) => pizza._id === action.payload._id && pizza.varient===action.payload.varient);
            if(alreadyPresent!=null)
            {
                const DeleteIdx=state.data.findIndex((pizza) => pizza._id === alreadyPresent._id && pizza.varient===alreadyPresent.varient);
                state.data.splice(DeleteIdx,1);
                state.data.splice(DeleteIdx,0,action.payload); 
            }else
            {
                state.data.push(action.payload); 
            }
            
        },
        deletePizza:(state,action)=>{
            const DeleteIdx=state.data.findIndex((pizza) => pizza._id === action.payload._id && pizza.varient===action.payload.varient);
            state.data.splice(DeleteIdx,1);
            //state.data=state.data.filter((pizza) =>  pizza.varient !== action.payload.varient && pizza.name !== action.payload.name);
        },
    },
});


export const {addPizza,deletePizza} =cartSlice.actions;
export default cartSlice.reducer;