const express       = require('express');
const dotenv        = require('dotenv').config();
const cookieParser  = require('cookie-parser');
const cors          = require('cors');
const app           = express();


//Database connection
const connectDB     =require('./dbConnect/mongoDb');

//require each routes from the route folder
const registerRoute     = require('./routes/registerRoute');
const loginRoute        = require('./routes/loginRoute');
const homeRoute         = require('./routes/homeRoute');
const blogRoute         = require('./routes/blogRoute');



//creating cors options for accepted urls ;
const whitelist = ["http://localhost:3000", 'https://trendspace.onrender.com'];

const corsOptions = {
  origin: (origin, callback)=>{
    if(!origin || whitelist.indexOf(origin) !== -1){
      callback(null, true);
    }else{
      callback(new Error("Not Allowed By CORS"));
    }
  },
  credentials: true,
}

// ===============MIDDLEWARES==========================

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static('public'));
  




//====== routes for application========//
app.use('/api/v1/register', registerRoute);
app.use('/api/v1/auth', loginRoute);
app.use('/api/v1/', homeRoute);
app.use('/api/v1/blogs', blogRoute);






//server listening function...  
app.listen(process.env.PORT, async() => {
    await connectDB();
    console.log(`listening on port ${process.env.PORT} on the local server`)
})