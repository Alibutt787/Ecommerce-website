const express=require('express');
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const ProductRoutes = require('./Routes/Product.Routes');
const UserRoutes = require('./Routes/User.Routes');
const cookie=require('cookie-parser');
const OrderRoutes = require('./Routes/order.Routes');

app.use(cookie());
app.use(express.json());
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));
app.use(fileUpload());

app.use('/api',ProductRoutes);
app.use('/account',UserRoutes);
app.use('/order',OrderRoutes);





module.exports =app;
