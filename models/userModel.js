const mongoose      =require('mongoose');
const bcrypt        =require('bcrypt')
const Schema        = mongoose.Schema;


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
    bio:{
        type:String,
        maxLength:150
    },
    nationality:{
        type:String
    },
    role:{
        type:String,
        enum:["admin","subscriber","publisher"],
        default:"subscriber"
    },
    joined:{
        type:Date,
        default:Date.now
    },
})

userSchema.pre('save',async function(next){
    let password=this.password
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password, salt)
    this.password=hash
    next()
})


const user=new mongoose.model('user', userSchema)
module.exports=user