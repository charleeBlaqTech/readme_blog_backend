const express                           = require('express');
const router                            = express.Router();
const loginController                   = require('../controllers/Auth/AuthenticateUserController');
const {validateUserInputsForSignIn}     = require('../middlewares/validators')



router.post('/login', validateUserInputsForSignIn, loginController.store);

router.get('/logout', loginController.destroy);





module.exports = router;