const express       = require('express');
const router        = express.Router();
const PostsController = require('../controllers/postControllers');
const authorized =require('../middlewares/authUsers');




router.route('/').get(authorized,PostsController.postsGet).post(authorized,PostsController.postsPost);
router.get('/new',authorized, PostsController.postsNewGet);
router.route('/:id').get(authorized,PostsController.postsShow).post(authorized,PostsController.postsUpdatePut);
router.get('/:id/edit',authorized, PostsController.postsEditGet);
router.get('/:id/delete',authorized, PostsController.postsDelete);
router.get('/category/:name',authorized, PostsController.postsCategory);










module.exports=router;