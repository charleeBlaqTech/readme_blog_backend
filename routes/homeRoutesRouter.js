const express       = require('express');
const router        = express.Router();
const homeController= require('../controllers/homeControllers')





router.post('/login',homeController.loginUser)
router.post('/signup',homeController.registerUser)
router.get('/logout',homeController.logoutUser)






module.exports=router;