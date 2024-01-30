const Post             = require('../models/BlogModel');
const {blogUploads}        = require('../helpers/fileUploads');



class BlogController{


    static async index(req, res) {

       try {
        const blogs= await Post.find({}).populate("author");
        res.status(200).json({blogs:blogs, status:200});
       } catch (error) {
        res.status(400).json({message:error.message, status:400});
       }
        
    }


    // static create(req, res) {
    //     if(!req.user){
    //         res.send('To display the the');
    //     }else{
    //         res.send(`welcome to the home page ${req.user.email}`);
    //     }
        
    // }


    // static async store(req, res) {
    //     if(!req.body){
    //         res.status(400).json({ status: 400, message:"request body cannot be empty" });
    //     }

    //     try {
    //         //HANDLED FILE UPLOADs FOR NEW MOVIE HERE WITH MULTER
    //         const saveBlogUploads = blogUploads.single('movieImage');
            
    //         if(!req.body){
    //             res.status(400).json({ status: 400, message:"The movie name entered does not exist" })
    //         }
    //         // const blogs= await Blog.create({
    //         //     title,
    //         //     description,
    //         //     image:  req.file.path,
    //         //     category,
    //         //     author 
    //         // })
    //         res.status(200).json({blogs:blogs, status:200});
    //     } catch (error) {
    //         res.status(400).json({ status: 400, message: error.message })
    //     }

    // }


    static async show(req, res) {

        let blogId = ""

        if(!req.params){
            res.status(400).json({ status: 400, message:"request parameter cannot be empty" });
        }else{
            blogId = req.params?.blogid;
        }
        try {
            const singleBlog = await Post.findById({_id: blogId}).populate('author');
            res.status(200).json({blog: singleBlog, status:200});

        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }


    // static edit(req, res) {
    //     try {

    //     } catch (error) {
    //         res.status(400).json({ status: 400, message: error.message })
    //     }

    // }


    // static async update(req, res) {
    //     let blogId = ""

    //     if(!req.params || !req.body){
    //         res.status(400).json({ status: 400, message:"request parameter or body cannot be empty" });
    //     }else{
    //         blogId = req.params?.blogid;
    //     }

    //     try {
    //         const foundMovie = await Movie.findOne({movieName:req.body.updateMovieName});
    //         if(!foundMovie){
    //             res.status(400).json({ status: 400, message:"The movie name entered does not exist" })
    //         }

    //         const singleBlog = await Blog.findById({_id: blogId});

    //         singleBlog.blogHeading     = req.body.updateBlogHeading,
    //         singleBlog.blogContent     = req.body.updateBlogContent,
    //         singleBlog.movie           = foundMovie._id
    //         singleBlog.save();
    //         res.status(200).json({blog: singleBlog, status:200});
    //     } catch (error) {
    //         res.status(400).json({ status: 400, message: error.message })
    //     }

    // }

    static async category(req, res){
        try {
         if(req.params.catName){
             const data= await Post.find({category:req.params.catName}).populate("author");

            if(data.length){
                res.status(200).json({blogs:data, status:200});
            }else{
                let error= new Error("category not found");
                error.statusCode = 404
                throw error
            }   
         }
        } catch (error) {
         res.status(400).json({message:error.message, status:400});
        }
     }


    // static async destroy(req, res) {
    //     let blogId = ""

    //     if(!req.params){
    //         res.status(400).json({ status: 400, message:"request parameter cannot be empty" });
    //     }else{
    //         blogId = req.params?.blogid;
    //     }
    //     try {
    //         await Blog.findByIdAndDelete({_id: blogId});
    //         res.status(200).json({message:"Blog deleted successfully", status:200});
    //     } catch (error) {
    //         res.status(400).json({ status: 400, message: error.message })
    //     }

    // }

    // //Get the single Movie from database if it exist
    // const singleMovie = await Movie.findById({_id: movieId});

    // //check if the single movie has an image and remove from upload folder befor update to avoid multiple storage of same image
    // if(singleMovie.movieImage){
    //     await fsPromise.unlink(singleMovie.movieImage);
    // }


    // try {

    //     const singleMovie = await Movie.findById({_id: movieId});

    //     //check if the single movie has an image and remove from upload folder before deleting from db to avoid having image of a deleted movie in our upload folder.
    //     if(singleMovie.movieImage){
    //         await fsPromise.unlink(singleMovie.movieImage);
    //     }

    //     await Movie.findByIdAndDelete({_id: movieId});
    //     res.status(200).json({message:"Movie deleted successfully", status:200});
    // } catch (error) {
    //     res.status(400).json({ status: 400, message: error.message })
    // }
}



module.exports = BlogController;