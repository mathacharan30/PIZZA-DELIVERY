const express = require("express");
const router = express.Router();
const user = require('../models/userModel');
const bycrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new user({ username, email, password });
    //hashing the password after the new user is made 
    //its a middle ware used in the user model
    try {
        const new2 = await newUser.save();
        // res.send(new2);
        res.send("user registered successfully");
        //if u want to check the response from the api use post man and use res.send line
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post('/login', async (req, res) => {
    let token;
    const { username, password } = req.body;
    const dbuser = await user.findOne({ username: username });
    // console.log(dbuser);
    if (dbuser) {
        const result = await bycrypt.compare(password, dbuser.password);
        // console.log(result);
        if (result) {
            //after finding the user we will call this function on that user and send that as a cookie to the front end
            token = await dbuser.generateAuth();
            res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + 28980000),
                httpOnly: true,
            });
            // console.log(token);
            // res.send("user logged in successfully");
            const user={
                _id:dbuser._id,
                name:dbuser.username,
                role:dbuser.role,
            }
            res.send(user);
        } else {
            res.status(400).send("incorrect password");
        }
    } else {
        res.status(400).send("user not found");
    }
})


router.get('/logout',(req,res)=>{
    res.cookie("jwtToken", "", {
        expires: new Date(Date.now() + 5),
    });
    res.send("logout successful");
})



module.exports = router


