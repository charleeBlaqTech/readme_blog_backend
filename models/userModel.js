const mongoose      = require('mongoose');
const bcrypt        = require('bcrypt');

const Schema = mongoose.Schema;



const userSchema= new Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        enum:["admin","subscriber","publisher"],
        default:"admin"
    },
    joined:{
        type:Date,
        default:Date.now
    },
})


//TO HASH NEW USER PASSWORD BEFOR SAVING THEIR DETAILS
userSchema.pre('save'  ,async function(next){

    if(!this.isModified('password')){
        return next();
    }else{
        let password        = this.password;
        const salt          = await bcrypt.genSalt(12);
        const hashed        = await bcrypt.hash(password, salt);
        this.password       = hashed;
        next()
    }

})


const User= mongoose.model('user', userSchema);

module.exports= User