const dotenv     = require("dotenv").config();
const mongoose   = require("mongoose");

const connectToDb= async()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.nh33n48.mongodb.net/readmeDB`);
        console.log('database connected successfully')
    } catch (error) {
        console.error(error.message);
    }
}

module.exports= connectToDb;