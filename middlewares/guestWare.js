const jwt           = require('jsonwebtoken');
const checkUserExist = require('../helpers/userExist');


const guestUser= async (req, res, next)=>{

    const secret = process.env.SECRET_STRING;

   if(req.headers.cookie){
       const token = req.headers.cookie.split('=')[1];

       const {currentUserEmail}   = await jwt.verify(token, secret);
       const currentUserDetails   = await checkUserExist(currentUserEmail);

       req.user = currentUserDetails;
       next();
    
   }else{
       next();
    }
   
}


module.exports = guestUser;