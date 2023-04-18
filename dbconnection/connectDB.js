const dotenv     = require("dotenv").config();
const mongoose = require("mongoose");

const connectToDb= ()=>{
    return (
        mongoose.connect(process.env.MONGO_DB_STRING).then(()=>{
            console.log('database connected successfully');
        }).catch((error)=>{
            console.log(error);
        })
    )
}

module.exports= connectToDb;