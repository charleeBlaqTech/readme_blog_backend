const dotenv     = require("dotenv").config();
const mongoose   = require("mongoose");

const connectToDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_STRING);
        console.log('database connected successfully')
    } catch (error) {
        console.error(error.message);
    }
}

module.exports= connectToDb;