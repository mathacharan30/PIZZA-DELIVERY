import {configureStore} from '@reduxjs/toolkit';
import pizzaReducer from './slices/pizzaSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import loginReducer from './slices/loginSLice';

export const store=configureStore({
    reducer:{
        pizza:pizzaReducer,
        cart:cartReducer,
        user:userReducer,
        loginuser:loginReducer,
    },
});
