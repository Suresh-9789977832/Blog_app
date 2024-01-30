const mongoose = require("./index")

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    avatar: {
        type: String
    },
    posts: {
        type: Number,
        default:0
    }

})


const usermodal = mongoose.model("users", userschema)
module.exports=usermodal


