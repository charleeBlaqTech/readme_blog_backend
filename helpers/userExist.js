const User = require('../models/userModel');


async function checkUserExist(userEmail=""){
    try {
        const response = await User.findOne({email:userEmail});
        return response;
    } catch (error) {
        return error.message;
    }
    
}


module.exports= checkUserExist;