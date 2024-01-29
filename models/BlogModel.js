const mongoose      = require('mongoose');


const Schema = mongoose.Schema;

const blogSchema= new Schema({

    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    created:{
        type: Date,
        default: Date.now(),
    }

});



const Blog= mongoose.model('post', blogSchema);

module.exports= Blog;