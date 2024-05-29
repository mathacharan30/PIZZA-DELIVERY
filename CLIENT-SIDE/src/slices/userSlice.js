import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const postUser=createAsyncThunk('postUser',async(data)=>{
    // console.log(data);
   const response= await axios.post("http://localhost:8080/api/user/signup",data);
//    console.log(data);
   console.log(response);
})

const userSlice=createSlice({
    name:'user',
    initialState:{
        request:false,
        success:false,
        error:false
    },
    extraReducers:(builder)=>{
        builder.addCase(postUser.pending,(state,action)=>{
            state.request=true;
        })
        builder.addCase(postUser.fulfilled,(state,action)=>{
            state.request=false;
            state.success=true;
        })
        builder.addCase(postUser.rejected,(state,action)=>{
            state.request=false;
            state.error=true;
        })
    }
})

export default userSlice.reducer;
