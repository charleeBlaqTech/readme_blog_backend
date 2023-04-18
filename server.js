const dotenv     = require("dotenv").config();
const mongoose   = require("mongoose");
const cors       = require('cors');

const express = require('express');
const fileUpload = require('express-fileupload');
const app= express();
const connectToDb= require('./dbconnection/connectDB');
connectToDb();


const postsRoutes= require('./routes/postRoutesRouter');


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(fileUpload());

app.use('/', postsRoutes);







app.listen(process.env.PORT, ()=>{
    console.log(`listenning on port: ${process.env.PORT}`)
})