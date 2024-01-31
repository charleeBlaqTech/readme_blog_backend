const User = require('../../models/userModel');
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
                        fullname: req.body.fullname,
                        username: req.body.username,
                    })

                    res.status(200).json({ status: 200, message: "account created successfully" });
                }
            }
                          
        }catch(error){
            res.status(400).json({status:400, message: error.message});
        }
    }


    static async update(req, res) {
        try {

            if (!req.body) {
                res.status(400).json({ status: 400, message: "bad request" })
            } else {
                const foundUser = await checkUserExist(req.body.email);
                if (!foundUser) {
                    res.status(400).json({ status: 400, message: "The User With This Email not found" });
                } else {
                    const existingUser  = await User.findOne({email:req.body.email})
                    existingUser.role   = "admin";
                    existingUser.save();
                    res.status(200).json({ status: 200, message: "you have updated user ROLE successfully" });
                }

            }

        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }


    static async destroy(req, res){
        try {
            if (!req.params) {
                res.status(400).json({ status: 400, message: "bad request" })
            } else {
                await User.findByIdAndDelete({_id:req.params.userId})
                res.status(200).json({ status: 200, message: "USER DELETED successfully" });
            }
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }
    }
}

module.exports = RegisterUser;