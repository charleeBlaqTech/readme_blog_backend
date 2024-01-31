const User              = require("../models/userModel");


class HomeController{

    static async create(req, res) {
        try {
            const users = await User.find();
            res.status(200).json({users:users})
        } catch (error) {
            console.log(error.message)
        }
        
    }


    static async store(req, res) {
        try {

        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }
    

    static destroy() {

    }
}



module.exports = HomeController;