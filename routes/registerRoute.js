const express                           = require('express');
const router                            = express.Router();
const registerController                = require('../controllers/Auth/RegisterUserController');
const {validateUserInputsForSignUp, comparePassword}  = require('../middlewares/validators')



router.post("/", comparePassword,validateUserInputsForSignUp,registerController.store);


module.exports = router;