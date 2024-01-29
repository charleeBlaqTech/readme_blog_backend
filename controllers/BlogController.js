const Blog              = require('../models/BlogModel');
const Movie             = require('../models/MovieModel');



class BlogController{


    static async index(req, res) {

       try {
        const blogs= await Blog.find({}).populate("movie");
        res.status(200).json({blogs:blogs, status:200});
       } catch (error) {
        res.status(400).json({message:error.message, status:400});
       }
        
    }


    static create(req, res) {
        if(!req.user){
            res.send('To display the the');
        }else{
            res.send(`welcome to the home page ${req.user.email}`);
        }
        
    }


    static async store(req, res) {
        if(!req.body){
            res.status(400).json({ status: 400, message:"request body cannot be empty" });
        }

        try {
            
            const foundMovie = await Movie.findOne({movieName: req.body.movieName.toLowerCase()});
            if(!foundMovie){
                res.status(400).json({ status: 400, message:"The movie name entered does not exist" })
            }
            const blogs= await Blog.create({
                blogHeading:    req.body.blogHeading,
                blogContent:    req.body.blogContent,
                movie:          foundMovie._id
                title,
                description,
                image,
                category,
                author 
            })
            res.status(200).json({blogs:blogs, status:200});
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }


    static async show(req, res) {

        let blogId = ""

        if(!req.params){
            res.status(400).json({ status: 400, message:"request parameter cannot be empty" });
        }else{
            blogId = req.params?.blogid;
        }
        try {
            const singleBlog = await Blog.findById({_id: blogId}).populate('movie');
            res.status(200).json({blog: singleBlog, status:200});

        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }


    static edit(req, res) {
        try {

        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }


    static async update(req, res) {
        let blogId = ""

        if(!req.params || !req.body){
            res.status(400).json({ status: 400, message:"request parameter or body cannot be empty" });
        }else{
            blogId = req.params?.blogid;
        }

        try {
            const foundMovie = await Movie.findOne({movieName:req.body.updateMovieName});
            if(!foundMovie){
                res.status(400).json({ status: 400, message:"The movie name entered does not exist" })
            }

            const singleBlog = await Blog.findById({_id: blogId});

            singleBlog.blogHeading     = req.body.updateBlogHeading,
            singleBlog.blogContent     = req.body.updateBlogContent,
            singleBlog.movie           = foundMovie._id
            singleBlog.save();
            res.status(200).json({blog: singleBlog, status:200});
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }

    static async postsCategory(req, res){
        try {
         if(req.params.name ){
             const data= await Blog.find({category:req.params.name}).populate("author");
             
             res.status(200).json({blogs:data, status:200});
         }else{
             res.status(404).json({message:error, status:404});
         }
        } catch (error) {
         res.status(400).json({message:error.message, status:400});
        }
     }


    static async destroy(req, res) {
        let blogId = ""

        if(!req.params){
            res.status(400).json({ status: 400, message:"request parameter cannot be empty" });
        }else{
            blogId = req.params?.blogid;
        }
        try {
            await Blog.findByIdAndDelete({_id: blogId});
            res.status(200).json({message:"Blog deleted successfully", status:200});
        } catch (error) {
            res.status(400).json({ status: 400, message: error.message })
        }

    }
}



module.exports = BlogController;