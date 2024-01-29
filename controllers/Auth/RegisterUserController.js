const User = require('../../models/UserModel');
const checkUserExist = require('../../helpers/userExist');



class RegisterUser{



    static async store(req, res){

        try{
            if(!req.body){
                res.status(400).json({ status: 400, message: "bad request" });
            }else{
                const foundUser = await checkUserExist(req.body.email);
                if (foundUser) {
                    res.status(400).json({ status: 400, message: "User with this email already exist" })
                } else {

                    await User.create({
                        email: req.body.email,
                        password: req.body.password,
                        fullname: req.body.name,
                    })

                    res.status(200).json({ status: 200, message: "account created successfully" });
                }
            }
                          
        }catch(error){
            res.status(400).json({status:400, message: error.message});
        }
    }


    static destroy(){

    }
}

module.exports = RegisterUser;