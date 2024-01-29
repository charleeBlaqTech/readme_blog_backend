const express                           = require('express');
const router                            = express.Router();
const MovieController                   = require('../controllers/MovieController');
const guestUser                         = require('../middlewares/guestWare');
const adminUser                         = require('../middlewares/adminRoleWare');



router.route('/create').get(guestUser, MovieController.create);

router.route('/').get(guestUser, MovieController.index).post(adminUser ,MovieController.store);

router.route('/:movieid').get(guestUser, MovieController.show).patch(adminUser,MovieController.update).delete(adminUser, MovieController.destroy);

router.route('/:movieid/edit').get(adminUser, MovieController.edit);



module.exports = router;