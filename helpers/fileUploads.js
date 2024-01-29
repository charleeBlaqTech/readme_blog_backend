const multer = require('multer');


//I MADE DIFFERENT FUNCTIONS FOR EASY UNDERSTANDING


//TO SAVE ALL MOVIE CONTROLLER IMAGES IF ANY  
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/movieImageUploads')
    },
    filename: function(req, file, callback){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        callback(null, file.originalname + "-" + uniqueSuffix);
    }
})

const movieUploads = multer({storage});




//TO SAVE ALL BLOG IMAGES IF ANY

const Storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/blogImageUploads')
    },
    filename: function(req, file, callback){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        callback(null, file.originalname + "-" + uniqueSuffix);
    }
})

const blogUploads = multer({storage:Storage}).single('blogImage');

module.exports = {movieUploads, blogUploads};