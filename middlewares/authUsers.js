const dotenv       =require('dotenv').config()
const bcrypt       =require('bcrypt')
const jwt          =require('jsonwebtoken')
const user         =require('../models/userModel')

const authorized= async (req, res, next)=>{
   if(req.headers.cookie){
        const auth=req.headers.cookie;
        const authToken=auth.split("=")[1];

        if(authToken){
            const decoded=await jwt.verify(authToken, process.env.TOKEN_SECRET_CODE)
            const userId= decoded.verifiedUserId
            const loggedInUser= await user.findById(userId); 
            req.user=loggedInUser
            next()
        }else{
            res.status(404).json({message: "unauthorized", status:404})
        }
   }else{
    res.status(400).json({message: "unauthorized", status:404, redirect: "/signin"})
   }
}

module.exports=authorized