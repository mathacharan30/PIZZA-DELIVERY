import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

axios.defaults.withCredentials=true;


export const loginUser=createAsyncThunk('loginUser',async(data)=>{
   const response= await axios.post("http://localhost:8080/api/user/login",data);
})

export const logoutUser=createAsyncThunk('logoutUser',async(data)=>{
    const response= await axios.get("http://localhost:8080/api/user/logout");
    console.log(response.data);
 })


const loginSlice=createSlice({
    name:'loginuser',
    initialState:{
        request:false,
        success:false,
        error:false
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state,action)=>{
            state.request=true;
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.request=false;
            state.success=true;
            state.error=false;
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.request=false;
            state.error=true;
            state.success=false;
        })
    }
})

export default loginSlice.reducer;