const mongoose=require("mongoose");

const userInfoSchema=mongoose.Schema({
    userId:{type:String,require},
    fullName:{type:String,require},
    address:{type:String,require},
    phoneNumber:{type:Number,require},
});


const userInfomodel=mongoose.model('userInfo',userInfoSchema);

module.exports=userInfomodel