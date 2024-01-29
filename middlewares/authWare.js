const jwt           = require('jsonwebtoken');
const checkUserExist = require('../helpers/userExist');


const authenticateUser= async (req, res, next)=>{

    const secret = process.env.SECRET_STRING;

   if(req.headers.cookie){
       const token = req.headers.cookie.split('=')[1];
       
       const {currentUserEmail}         = await jwt.verify(token, secret);
       const currentUserDetails         = await checkUserExist(currentUserEmail);

       req.user = currentUserDetails ;
       next();
    
   }else{
       res.status(400).json({message: "You are not authorized, signup or signin to access"})
    }
   
}


module.exports = authenticateUser;