const mongoose = require('mongoose');
const Schema= mongoose.Schema;


const postSchema= new Schema({

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
    created:{
        type: Date,
        default: Date.now(),
    }

});

const postModel= new mongoose.model("post", postSchema);

module.exports= postModel;