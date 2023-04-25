const post = require('../models/postModel');




const postsGet          =  async (req, res)=>{
    try {
        const data= await post.find().sort({created: 1}).limit(3);
        const data2= await post.find().sort({created: -1}).limit(1);
        res.status(201).json([data,data2]);
    } catch (error) {
        res.status(404).json(error)
    }
   
}

const postsNewGet       =  (req, res)=>{
    res.json("are u ready to add new data");
}

const postsPost         = async (req, res)=>{
    const {title, description, image,category} = req.body;
    if(title && description && image && category){
        await post.create({
            title,
            description,
            image,
            category
        }).then((response)=>{
            res.status(200).json(response);
        }).catch((error)=>{
            res.status(400).json(error);
        })
    }else{
        res.status(404).json(error);
    }
    
}

const postsShow         =  async(req, res)=>{
    if(req.params.id){
        const postDetail= await post.findOne({_id:req.params.id}).then((response)=>{
            res.status(201).json(response);
        }).catch((error)=>{
            res.status(404).json(error);
            res.redirect('/blogs');
        })

    }else{
        res.status(404).json(error);
        res.redirect('/blogs');
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
            res.status(200).json(response);
        }).catch((error)=>{
            res.status(400).json(error);
        })
    }else if(updateTitle || updateDescription || updateImage || updateCategory){

        if(updateTitle){
            await post.findOne({_id:id}).then((response)=>{
                response.title = updateTitle;
                response.save();
                res.status(200).json(response);
            }).catch((error)=>{
                res.status(400).json(error);
            })
        }else if(updateDescription){
            await post.findOne({_id:id}).then((response)=>{
                response.description = updateDescription;
                response.save();
                res.status(200).json(response);
            }).catch((error)=>{
                res.status(400).json(error);
            })
        }else if(updateImage){
            await post.findOne({_id:id}).then((response)=>{
                response.image = updateImage;
                response.save();
                res.status(200).json(response);
            }).catch((error)=>{
                res.status(400).json(error);
            })
        }else if(updateCategory){
            await post.findOne({_id:id}).then((response)=>{
                response.category = updateCategory;
                response.save();
                res.status(200).json(response);
            }).catch((error)=>{
                res.status(400).json(error);
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
            res.status(200).json(response);
        }).catch((error)=>{
            res.status(400).json(error);
        })
    }else{
        res.status(400).json(error);
        res.redirect('/blogs');
    }
}

const postsCategory     = async (req, res)=>{
    if(req.params.name){
        const postDetail= await post.find({category:req.params.name}).then((response)=>{
            res.status(201).json(response);
        }).catch((error)=>{
            res.status(404).json(error);
            res.redirect('/blogs');
        })
    }else{
        res.status(404).json(error);
        res.redirect('/blogs');
    }
}





module.exports= {postsGet,postsNewGet,postsShow, postsPost, postsEditGet, postsUpdatePut, postsDelete,postsCategory}