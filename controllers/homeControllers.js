const dotenv       =require('dotenv').config()
const bcrypt       =require('bcrypt');
const jwt          =require('jsonwebtoken');
const user         =require('../models/userModel');
const cookieParser =require('cookie-parser');




const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const verifyUser=await user.findOne({email:email})
        if(verifyUser){
            const passwordVerify= bcrypt.compareSync(password, verifyUser.password)
            if(passwordVerify === true){
                const verifiedUserId=verifyUser._id
                const accessToken= await jwt.sign(({verifiedUserId}), process.env.TOKEN_SECRET_CODE,{expiresIn: 300});
                
                res.cookie('auth',accessToken,{maxAge:300000, httpOnly: true, sameSite: "lax"})
                
                res.json({status: 200, redirect: "/"})
            }else{
                res.status(404).json({status: 404, message: "The password Entered does not match", redirect: "/signin"});
            }
            
        }else{
            res.status(404).json({status: 404,redirect: "/signin", message: "The User With This Email not found"});
        }
    }catch(error){
        res.status(400).json({status:400, message: error,redirect: "/signin"})
    }   
}

//=======================================================================
const registerUser=async(req,res)=>{ 
    try{
        const {fullname,password, email, username}=req.body

        if(fullname && password && email && username){
            const checkUserExist= await user.findOne({email:email});
            if(checkUserExist){
                res.status(400).json({status:400, message: "User with this email already exist"})
            }else{
                const newUser= await user.create({
                    fullname,
                    email,
                    password,
                    username
                })
                res.status(201).json({data: newUser, status:201,redirect: "/", message: "Your Account was created Successfully"});
            }
            
        }else{
            res.status(404).json({ status:404,redirect: "/signup", message: "User informations not complete to Continue request"});
        }
       
    }catch(error){
        res.status(400).json({status:400, message: error, redirect: "/signup"});
    }
   
}

//======================================================================
const logoutUser= async (req, res)=>{
    const currentUser = req.user
    if(currentUser){
        await res.cookie('auth', '', {maxAge: 10})
        res.status(200).json({status:200});
    }else{
        res.status(400).json({status:400});
    }
    
}

// ==========contact endpoint========
const contact   = async (req, res)=>{
    const is_user= req.user
    try {
        if(is_user){
            res.status(200).json({status: 200, user: is_user});
        }else{
            res.status(404).json({status:404, redirect: "/signin", user: is_user})
        }
    } catch (error) {
        res.status(404).json({message:error, status:404, redirect: "/signin", user: is_user})
    }
}






module.exports={loginUser,registerUser, logoutUser, contact }
   

