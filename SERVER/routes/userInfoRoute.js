const express = require("express");
const router = express.Router();
const userInfo = require('../models/userInfoModel');


router.post("/createUser",async(req,res)=>{
    const {userId,fullName,address,phoneNumber}=req.body;

    const createUser=new userInfo({userId,fullName,address,phoneNumber});
    try {
        const user = await createUser.save();
        res.send("user information updated successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

router.post("/updateUser",async(req,res)=>{
    const {userId,fullName,address,phoneNumber}=req.body;

    const user=await userInfo.findOne({userId:userId});
    try {
        const user1 = await userInfo.findByIdAndUpdate(user._id,{userId,fullName,address,phoneNumber});
        res.send("user information updated successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})


module.exports = router