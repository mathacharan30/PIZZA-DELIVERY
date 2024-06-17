import {configureStore} from '@reduxjs/toolkit';
import pizzaReducer from './slices/pizzaSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';

export const store=configureStore({
    reducer:{
        pizza:pizzaReducer,
        cart:cartReducer,
        user:userReducer,
        authUser:authReducer,
    },
});
