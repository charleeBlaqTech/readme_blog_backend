const express       = require('express');
const router        = express.Router();
const PostsController = require('../controllers/postControllers')




router.get('/blogs', PostsController.postsGet);
router.get('/blogs/new', PostsController.postsNewGet);
router.post('/blogs', PostsController.postsPost);
router.get('/blogs/:id', PostsController.postsShow);
router.get('/blogs/:id/edit', PostsController.postsEditGet);
router.post('/blogs/:id', PostsController.postsUpdatePut);
router.get('/blogs/:id/delete', PostsController.postsDelete);










module.exports=router;