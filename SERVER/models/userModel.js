const mongoose=require("mongoose");
const bycrypt =require("bcrypt");
const jwt=require('jsonwebtoken');
const userSchema=mongoose.Schema({
    username:{type:String,require},
    email:{type:String,require},
    password:{type:String,require},
    role:{type:String,require,default:"Admin"},
},{
    timestamps:true,
})


 

//as we are hashing the password we will change the user model
//here before the save method this will be called as a middleware
userSchema.pre('save',async function(next){
    const salt=await bycrypt.genSalt();
    this.password=await bycrypt.hash(this.password,salt);
    next();
})
//is modified is used to check whether a change has occured in the password or not 
//when no password is entered u cannot hash it 
//this is just validation

//here we are generating the jwt token 
//userschema is an instance of the mongoose schema
//we will call the method for generating the jwt token
//here below we dont use the arrow functions because 'this' method cannot be used
userSchema.methods.generateAuth=async function(){
    try{
        //we are generating the jwt for the id of the user because the unique thing is the id in the mongo db
        let token=jwt.sign({_id:this._id},"mysecretkey");
        return token;
    }catch(err){
        console.log(err);
    }
}


const userModel=mongoose.model('users',userSchema);

module.exports=userModel