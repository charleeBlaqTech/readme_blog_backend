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

const homeRoutes        = require('./routes/homeRoutesRouter');
const postsRoutes       = require('./routes/postRoutesRouter');



const whitelist = [process.env.ORIGIN_CLIENT_URL, 'https://trendspace.onrender.com'];

const corsOptions = {
  origin: (origin, callback)=>{
    if(!origin || whitelist.indexOf(origin) !== -1){
      callback(null, true);
    }else{
      callback(new Error('Not allowed By CORS'))
    }
  },
  credentials: true,
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(cors(corsOptions));
app.use(fileUpload());


app.use('/', homeRoutes);
app.use('/blogs', postsRoutes);




app.listen(process.env.PORT, async()=>{
  await connectToDb()
  console.log("server connected")
})