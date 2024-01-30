const mongoose = require('mongoose');


const connectDB = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_STRING);
        return console.log('database connected successfully ✔✔✔');
    } catch (error) {
        console.error(error.message);
    }
}


module.exports = connectDB;