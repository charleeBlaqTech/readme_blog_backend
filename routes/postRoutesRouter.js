const express       = require('express');
const router        = express.Router();
const PostsController = require('../controllers/postControllers');
const authorized =require('../middlewares/authUsers');




router.route('/').get(PostsController.postsGet).post(PostsController.postsPost);

router.get('/new',authorized, PostsController.postsNewGet);
router.route('/:id').get(PostsController.postsShow).post(PostsController.postsUpdatePut);
router.get('/:id/edit', PostsController.postsEditGet);
router.get('/:id/delete', PostsController.postsDelete);
router.get('/category/:name', PostsController.postsCategory);










module.exports=router;