const jwt = require('jsonwebtoken');
const user = require('./models/userModel');
const express = require("express");
const router = express.Router();


module.exports.isLoggedIn = async (req, res, next) => {
    const token = req.cookies.jwtToken;
    try {
        //check if the token exists 
        if (token) {
            let res1 = await jwt.verify(token, "mysecretkey");
            const dbuser1 = await user.findOne({ _id: res1._id });
            console.log(dbuser1);
            next();
        } else {
            res.status(400).send("token not found");
        }
    } catch (err) {
        res.status(400).send("invalid token");
    }
}