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
            const passwordVerify= await bcrypt.compareSync(password, verifyUser.password)
            if(passwordVerify === true){
                const verifiedUserId=verifyUser._id
                const accessToken= await jwt.sign(({verifiedUserId}), process.env.TOKEN_SECRET_CODE,{expiresIn: 300});
               
                
                res.cookie('auth',accessToken,{maxAge:300000})
                
                res.json({status: 200})
            }else{
                res.status(404).json({status: 404, msg: "the password entered does not match"});
            }
            
        }else{
            res.status(404).json({status: 404, msg: "user not found"});
        }
    }catch(error){
        res.status(400).json(error)
    }   
}

//=======================================================================
const registerUser=async(req,res)=>{ 
    try{
        const {fullname,password, email, username}=req.body

        if(fullname && password && email && username){
            const newUser= await user.create({
                fullname,
                email,
                password,
                username
            })
            res.status(200).json({data: newUser, status: "user created"});
        }else{
            res.status(404).json({ status: "bad request with less user information"});
        }
       
    }catch(error){
        res.status(400).json(error);
    }
   
}

//======================================================================
const logoutUser= async (req, res)=>{
    await res.cookie('auth', '', {maxAge: 10})
    res.status(200).json();
}





module.exports={loginUser,registerUser, logoutUser}
   

