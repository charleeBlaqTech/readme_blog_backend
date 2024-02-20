const User              = require('../../models/userModel');
const bcrypt            = require('bcrypt');
const jwt               = require('jsonwebtoken');
const checkUserExist    = require('../../helpers/userExist');



class AuthenticateUser {

    static async create(req, res) {
        res.send('this is the login form page')
    }


    static async store(req, res) {
        try {
            if (!req.body) {
                res.status(400).json({ status: 400, message: "bad request" })
            } else {
                // console.log(req.body)
                const foundUser = await checkUserExist(req.body.email);
                if (!foundUser) {
                    res.status(400).json({ status: 400, message: "The User With This Email not found" });
                } else {
                    const passwordVerification = bcrypt.compareSync(req.body.password, foundUser.password);
                    if (!passwordVerification) {
                        res.status(404).json({ status: 404, message: "The password Entered does not match" });
                    } else {

                        const secret            = process.env.TOKEN_SECRET_CODE;
                        const currentUserEmail  = foundUser.email
                        const accessToken       = jwt.sign({currentUserEmail}, secret, { expiresIn: 420 });
                        res.status(200).json({ status: 200, user:foundUser, token: accessToken, message: "you have been logged in successfully" });
                    }
                }

            }

        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }


    static destroy() {
        try {
            res.cookie('token', "", { maxAge: 10, httpOnly: true, sameSite: "lax" });
            res.status(200).json({ status: 200, message: "you have been logged out successfully" });
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }
    }
}



module.exports = AuthenticateUser;