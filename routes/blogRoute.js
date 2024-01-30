const express                           = require('express');
const router                            = express.Router();
const BlogController                    = require('../controllers/BlogController');
const guestUser                         = require('../middlewares/guestWare');
const adminUser                         = require('../middlewares/adminRoleWare');



// router.route('/create').get(guestUser, BlogController.create);

router.route('/').get(guestUser, BlogController.index)

// post(adminUser,BlogController.store);

router.route('/:blogid').get(guestUser, BlogController.show)

// .patch(BlogController.update).delete(BlogController.destroy);

router.route('/category/:catName').get(BlogController.category);

// router.route('/:blogid/edit').get(adminUser, BlogController.edit);


module.exports = router;