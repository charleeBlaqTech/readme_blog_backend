const express       = require('express');
const router        = express.Router();
const PostsController = require('../controllers/postControllers')




router.get('/posts', PostsController.postsGet);
router.get('/posts/new', PostsController.postsNewGet);
router.post('/posts', PostsController.postsPost);
router.get('/posts/:id', PostsController.postsShow);
router.get('/posts/:id/edit', PostsController.postsEditGet);
router.put('/posts/:id', PostsController.postsUpdatePost);
router.delete('/posts/:id', PostsController.postsDelete);










module.exports=router;