const dotenv            = require("dotenv").config();
const mongoose          = require("mongoose");
const cors              = require('cors');
const methodOverride    = require('method-override');
const bcrypt            =require('bcrypt')
const jwt               =require('jsonwebtoken')
const cookieParser      =require('cookie-parser');

const express           = require('express');
const fileUpload        = require('express-fileupload');
const app               = express();
const connectToDb       = require('./dbconnection/connectDB');
connectToDb();
const homeRoutes        = require('./routes/homeRoutesRouter');
const postsRoutes       = require('./routes/postRoutesRouter');



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(cors({
  credentials: false,
  origin: "*",
 
}));
app.use(fileUpload());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


app.use('/', homeRoutes);
app.use('/blogs', postsRoutes);




app.listen(process.env.PORT, ()=>{
  console.log("server connected")
})