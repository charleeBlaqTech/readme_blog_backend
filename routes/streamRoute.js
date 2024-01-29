const express                           = require('express');
const router                            = express.Router();
const StreamController                  = require('../controllers/StreamController');
const authUser                          = require('../middlewares/authWare');
const adminUser                         = require('../middlewares/adminRoleWare');


router.route('/create').get(adminUser, StreamController.create);

router.route('/watch').get(authUser, StreamController.index);

router.route('/').post(adminUser, StreamController.store);

router.route('/:videoid').get(authUser, StreamController.show).patch(adminUser, StreamController.update).delete(adminUser, StreamController.destroy);

router.route('/:videoid/edit').get(adminUser, StreamController.edit);





module.exports = router;