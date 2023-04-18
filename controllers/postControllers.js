const post = require('../models/postModel');




const postsGet      =  (req, res)=>{
    const data= [
        {
            "id": 1,
            'title':"great development in Nigeria Politics",
            'description': "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate.",
            'image': "https://media.istockphoto.com/id/1462664485/photo/top-view-woman-and-phone-on-exercise-mat-for-social-media-mobile-app-and-reading-fitness-blog.jpg?b=1&s=170667a&w=0&k=20&c=RY7UtuFOFjhNQpwPPoi5gZTuPf-UPrGqBVhIoJW-e6k="
        },
        {
            "id": 2,
            'title':"great development in Nigeria Politics",
            'description': "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate.",
            'image': "https://media.istockphoto.com/id/1462664485/photo/top-view-woman-and-phone-on-exercise-mat-for-social-media-mobile-app-and-reading-fitness-blog.jpg?b=1&s=170667a&w=0&k=20&c=RY7UtuFOFjhNQpwPPoi5gZTuPf-UPrGqBVhIoJW-e6k="
        },
        {
            "id": 3,
            'title':"great development in Nigeria Politics",
            'description': "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate.",
            'image': "https://media.istockphoto.com/id/1462664485/photo/top-view-woman-and-phone-on-exercise-mat-for-social-media-mobile-app-and-reading-fitness-blog.jpg?b=1&s=170667a&w=0&k=20&c=RY7UtuFOFjhNQpwPPoi5gZTuPf-UPrGqBVhIoJW-e6k="
        },
       
]
    res.json(data);
}

const postsNewGet   =  (req, res)=>{
    res.json("are u ready to add new data");
}
const postsPost     =  (req, res)=>{
    res.json();
}
const postsShow     =  (req, res)=>{
    console.log(req.params.id);
    res.json(req.params.id);
}
const postsEditGet  =  (req, res)=>{
    res.json();
}
const postsUpdatePost   =  (req, res)=>{
    res.json();
}
const postsDelete       =  (req, res)=>{
    res.json();
}





module.exports= {postsGet,postsNewGet,postsShow, postsPost, postsEditGet, postsUpdatePost, postsDelete}