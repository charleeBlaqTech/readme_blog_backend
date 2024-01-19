const express       = require('express');
const router        = express.Router();
const homeController= require('../controllers/homeControllers');
const chackUser     =require("../middlewares/authUsers")





router.post('/login',homeController.loginUser)
router.post('/signup',homeController.registerUser)
router.get('/logout',chackUser,homeController.logoutUser)

router.get('/contact',homeController.contact)






module.exports=router;