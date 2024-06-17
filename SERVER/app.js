const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Pizza = require('./models/pizzaModel');
const bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const {isLoggedIn}=require('./middlewares.js');


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//the below use cors is used to send cookies for the front end 
//backend should know who is sending the request
//so it will set the cookies for that url
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());

const mongoUrl = "mongodb+srv://charan30:charan$30@cluster0.rnz3tlw.mongodb.net/mern-pizza";

const userRoute = require('./routes/userRoute');
app.use('/api/user', userRoute);

const userInfoRoute = require('./routes/userInfoRoute');
app.use('/api/userInfo', userInfoRoute);


const orderRoute = require('./routes/orderRoute');
app.use('/api/order', orderRoute);

main().then(() => {
    console.log("connected to DB Successfully");
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(mongoUrl);
}


app.get('/',isLoggedIn, (req, res) => {
    res.send("Hello this is port 8080");
});



app.get('/getpizzas', async (req, res) => {
    let allPizzas = await Pizza.find({});
    res.send(allPizzas);
});



app.listen(8080, () => {
    console.log(`listening on port 8080`);
});