const express                           = require('express');
const router                            = express.Router();
const HomeController                    = require('../controllers/HomeController');
const guestUser                         = require('../middlewares/guestWare');



router.route('/').get(guestUser, HomeController.create);



module.exports = router;