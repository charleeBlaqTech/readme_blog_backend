const post = require('../models/postModel');


const postsGet          =  async (req, res)=>{
    // const is_user= req.user
    try {
        const dataMain= await post.find().populate("author").sort({created: -1}).limit(1);
        const dataSideSec= await post.find().populate("author").sort({created: 1}).limit(2);
        const dataPolitics= await post.find({category:"politics"}).populate("author").sort({created:-1}).limit(2);
        const dataSports= await post.find({category:"sport"}).populate("author").sort({created:-1}).limit(2);
        res.status(200).json({blogs: [dataMain,dataSideSec,dataPolitics,dataSports], status: 200, message: "fetch data successful"});
    } catch (error) {
        res.status(400).json({message:error, status:400});
    }
   
}

const postsNewGet       = async (req, res)=>{
    const is_user= req.user
    try {
        if(is_user){
            res.status(200).json({status: 200, user: is_user});
        }else{
            res.status(404).json({status:404, redirect: "/signin", user: is_user})
        }
    } catch (error) {
        res.status(404).json({message:error, status:404, redirect: "/signin", user: is_user})
    }
}

const postsPost         = async (req, res)=>{
    const is_user= req.user
    const {title, description, image,category} = req.body;
    if(title && description && image && category && is_user){
        const author= is_user._id
        await post.create({
            title,
            description,
            image,
            category,
            author 
        }).then((response)=>{
            res.status(201).json({blog: response,user: is_user, status: 201, message: "Blog created successfully"});
        }).catch((error)=>{
            res.status(400).json({message:error, status:400, user: is_user});
        })
    }else{
        res.status(404).json({message:error, status:404, user: is_user});
    }
    
}

const postsShow         =  async(req, res)=>{
    // const is_user= req.user
    if(req.params.id){
        const postDetail= await post.findOne({_id:req.params.id}).populate("author")
        if(postDetail){
            res.status(200).json({blog: postDetail, status: 200});
        }
        
    }else{
        res.status(404).json({message:error, status:404});
       
    }
   
   
}

const postsEditGet      =  (req, res)=>{
    res.json();
}

const postsUpdatePut    = async(req, res)=>{

    const id = req.params.id
    const {updateTitle, updateDescription, updateImage,updateCategory}= req.body;
    if(updateTitle && updateDescription && updateImage && updateCategory){
        await post.findOne({_id:id}).then((response)=>{
            response.title = updateTitle;
            response.description = updateDescription;
            response.image = updateImage;
            response.category = updateCategory;
            response.save();
            res.status(200).json({blog: response, status: 200});
        }).catch((error)=>{
            res.status(400).json({message:error, status:400});
        })
    }else if(updateTitle || updateDescription || updateImage || updateCategory){

        if(updateTitle){
            await post.findOne({_id:id}).then((response)=>{
                response.title = updateTitle;
                response.save();
                res.status(200).json({blog: response, status: 200});
            }).catch((error)=>{
                res.status(400).json({message:error, status:400});
            })
        }else if(updateDescription){
            await post.findOne({_id:id}).then((response)=>{
                response.description = updateDescription;
                response.save();
                res.status(200).json({blog: response, status: 200});
            }).catch((error)=>{
                res.status(400).json({message:error, status:400});
            })
        }else if(updateImage){
            await post.findOne({_id:id}).then((response)=>{
                response.image = updateImage;
                response.save();
                res.status(200).json({blog: response, status: 200});
            }).catch((error)=>{
                res.status(400).json({message:error, status:400});
            })
        }else if(updateCategory){
            await post.findOne({_id:id}).then((response)=>{
                response.category = updateCategory;
                response.save();
                res.status(200).json({blog: response, status: 200});
            }).catch((error)=>{
                res.status(400).json({message:error, status:400});
            })
        }
    }
    else{
        res.status(400).redirect('/blogs');
    }

}

const postsDelete       =  async(req, res)=>{
    if(req.params.id){
        await post.findOneAndDelete({_id:req.params.id}).then((response)=>{
            res.status(200).json({blog: response, status: 200});
        }).catch((error)=>{
            res.status(400).json({message:error, status:400});
        })
    }else{
        res.status(400).json({message:error, status:400});
        
    }
}

const postsCategory     = async (req, res)=>{

   try {
    if(req.params.name ){
        const response= await post.find({category:req.params.name}).populate("author");
        const data = await response.json();
        res.status(200).json({blog:data, status:200});
    }else{
        res.status(404).json({message:error, status:404});
    }
   } catch (error) {
    res.status(400).json({message:error.message, status:400});
   }
}





module.exports= {postsGet,postsNewGet,postsShow, postsPost, postsEditGet, postsUpdatePut, postsDelete,postsCategory}