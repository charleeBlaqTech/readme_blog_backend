const Post              = require("../models/BlogModel");
const User              = require("../models/userModel");
const { blogUploads }   = require("../helpers/fileUploads");
const fsPromise         = require("fs/promises");
const {capitalize}      =require('../middlewares/validators')



class BlogController {


  static async index(req, res) {
    try {
      const blogs = await Post.find({}).populate("author");
      res.status(200).json({ blogs: blogs, status: 200 });
    } catch (error) {
      res.status(400).json({ message: error.message, status: 400 });
    }
  }



  static async store(req, res) {
    if (!req.body) {
      res
        .status(400)
        .json({ status: 400, message: "request body cannot be empty" });
    }

    try {
      //HANDLED FILE UPLOADs FOR NEW MOVIE HERE WITH MULTER
      // const saveBlogUploads = blogUploads.single("image");

      // saveBlogUploads(req, res, async (error) => {
      //   if (error) {
      //     res.status(400).json({ message: error });
      //   } else {
      //     console.log(req.body, req.file)
      //       const currentUser = await User.findOne({ email: "john@gmail.com" });
      //       if(!currentUser) {
      //           res.status(400).json({ status: 400, message: "unauhtorized" });
      //       }

      //     const blogs = await Post.create({
      //       title:          req.body.title,
      //       description:    req.body.description,
      //       image:          req.file.path,
      //       category:       req.body.category,
      //       author:         currentUser._id,
      //     });
      //     res.status(200).json({ blogs: blogs, status: 200 });
      //   }
      // });

         const currentUser = await User.findOne({ email: "john@gmail.com" });
          if(!currentUser) {
            res.status(400).json({ status: 400, message: "unauhtorized" });
          }

          const blogs = await Post.create({
            title:          req.body.title,
            description:    req.body.description,
            image:          req.body.image,
            category:       req.body.category,
            author:         currentUser._id,
          });
          res.status(200).json({ blogs: blogs, status: 200 });
    } catch (error) {
      res.status(400).json({ status: 400, message: error.message });
    }
  }



  static async show(req, res) {
    let blogId = "";

    if (!req.params) {
      res
        .status(400)
        .json({ status: 400, message: "request parameter cannot be empty" });
    } else {
      blogId = req.params?.blogid;
    }
    try {
      const singleBlog = await Post.findById({ _id: blogId }).populate(
        "author"
      );
      res.status(200).json({ blog: singleBlog, status: 200 });
    } catch (error) {
      res.status(400).json({ status: 400, message: error.message });
    }
  }



  static async update(req, res) {
    let blogId = "";

    if (!req.params || !req.body) {
      res
        .status(400).json({
          status: 400,
          message: "request parameter or body cannot be empty",
        });
    } else {
      blogId = req.params?.blogid;
    }

    try {
 
      const currentUser = await User.findOne({ email: "john@gmail.com" });
      if(!currentUser) {
        res.status(400).json({ status: 400, message: "unauhtorized" });
      }
      
      const singlePost = await Post.findById({ _id: blogId });

      singlePost.title          = req.body.title;
      singlePost.description    = req.body.description;
      singlePost.author         = currentUser._id;
      singlePost.category       = req.body.category;
      singlePost.image          = req.file.path;
      singlePost.save();
      res.status(200).json({ blog: singlePost, status: 200 });
    } catch (error) {
      res.status(400).json({ status: 400, message: error.message });
    }
  }


  static async category(req, res) {
    try {
  
      if (req.params.catName) {
        const capitalCatName = capitalize(req.params.catName)
        const data = await Post.find({ category: capitalCatName }).populate('author')

        if (data.length) {
          res.status(200).json({ blogs: data, status: 200 });
        } else {
          let error = new Error("category not found");
          error.statusCode = 404;
          throw error;
        }
      }
    } catch (error) {
      res.status(400).json({ message: error.message, status: 400 });
    }
  }


  static async search(req, res) {
    try {
      if (req.query.query) {
        const data = await Post.find({
          $or: [
            { category: { $regex: req.query.query, $options: "i" } },
            { title: { $regex: req.query.query, $options: "i" } },
          ],
        }).populate("author");

        if (data.length) {
          res.status(200).json({ blogs: data, status: 200 });
        } else {
          // let error = new Error("category not found");
          // error.statusCode = 404;
          // throw error;

          const blogs = await Post.find({}).populate("author");
          res.status(200).json({ blogs: blogs, status: 200 });
        }
      }
    } catch (error) {
      res.status(400).json({ message: error.message, status: 400 });
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
          await Post.findByIdAndDelete({_id: blogId});
          res.status(200).json({message:"Blog deleted successfully", status:200});
      } catch (error) {
          res.status(400).json({ status: 400, message: error.message })
      }

  }


}

module.exports = BlogController;
