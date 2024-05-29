const express = require("express");
const router = express.Router();
const orderInfo = require('../models/ordersModel');


router.post("/createOrder", async (req, res) => {
    const { userId, orderItems, ordervalue, isDelivered, transactionId } = req.body;

    const createOrder = new orderInfo({ userId, orderItems, ordervalue, isDelivered, transactionId });
    try {
        const user = await createOrder.save();
        res.send("order placed successfully");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

//store the order details till the order is delivered so that we can access the order id and send it for the deletion 

router.post("/deleteOrder", async (req, res) => {
    const { orderId } = req.body;
    try {
        await orderInfo.findOneAndDelete({ _id: orderId });
        res.send("order deleted successfully ");
    } catch (err) {
        res.status(400).send("order is not deleted");
    }
})

router.post("/updateOrderStatus", async (req, res) => {
    const { orderId } = req.body;
    try {
        await orderInfo.findOneAndUpdate(orderId,{isDelivered:true});
        res.send("order delivered successfully ");
    } catch (err) {
        res.status(400).send("some error occured ");
    }
})

module.exports = router