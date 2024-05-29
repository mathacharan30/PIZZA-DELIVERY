const mongoose=require("mongoose");

const orderSchema=mongoose.Schema({
    userId:{type:String,require},
    orderItems:[],
    orderValue:{type:Number,require},
    isDelivered:{type:Boolean},
    transactionId:{type:String,require},
},{
    timestamps:true,
})

//in below written line the collection name is the orders and the schema is the order Schema 
//that model is exported 
const ordermodel=mongoose.model('orders',orderSchema);

module.exports=ordermodel

//here the order items has the pizza id as well as its quantity
//transaction id is the id given by the razor pay 
//here we do not store the address of the user we create it in the user model itself 
//the default address will be used for the delivery 