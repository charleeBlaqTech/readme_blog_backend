const jwt           = require('jsonwebtoken');
const User          = require('../models/UserModel');
const checkUserExist = require('../helpers/userExist');




const authorized= async (req, res, next)=>{

    const secret = process.env.SECRET_STRING;

   if(req.cookies.auth){

      const token = req.headers.cookie.split('=')[1];

        const { currentUserEmail }  = await jwt.verify(token, secret);
        const currentUserDetails    = await checkUserExist(currentUserEmail);

        if(currentUserDetails.role !== "admin"){
            res.status(400).json({ message: "You are not authorized" })
        }else{
            req.user = currentUserDetails;
            next();
        }

    } else {
        res.status(400).json({ message: "You are not authorized, signup or signin to access" })
    }
   
}


module.exports= authorized;