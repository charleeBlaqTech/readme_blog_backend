const dotenv     = require("dotenv").config();
const mongoose   = require("mongoose");

const connectToDb= ()=>{
    return (
        mongoose.connect(process.env.MONGO_DB_STRING)
    )
}

module.exports= connectToDb;