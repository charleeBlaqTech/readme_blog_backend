const dotenv       =require('dotenv').config()
const bcrypt       =require('bcrypt')
const jwt          =require('jsonwebtoken')
const cookieParser =require('cookie-parser');
const author       =require('../models/authorsModel');

const authorized= async (req, res, next)=>{
    const auth=req.cookies.auth
    if(auth){

        const decoded=await jwt.verify(auth, process.env.TOKEN_SECRET_CODE)
        const authorId= decoded.verifiedUserId
        const loggedInUser= await author.findById(authorId)
        req.user=loggedInUser
        next()
    }else{
        next();
    }
}

module.exports=authorized