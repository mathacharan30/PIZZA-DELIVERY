import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas=createAsyncThunk('fetchPizzas',async () =>{
    const response=await fetch("http://localhost:8080/getpizzas");
    return response.json();
}) 

const pizzaSlice=createSlice({
    name:'pizza',
    initialState:{
        isLoading:false,
        data:null,
        isError:false,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPizzas.pending,(state,action) =>{
            state.isLoading=true;
        })
        builder.addCase(fetchPizzas.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
        })
        builder.addCase(fetchPizzas.rejected,(state,action)=>{
            console.log('error',action.payload);
            state.isLoading=false;
            state.isError=true;
        })
    }
});

export default pizzaSlice.reducer;