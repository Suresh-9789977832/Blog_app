const { Schema } = require("mongoose")
const mongoose = require("./index")

const postschema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    category: {
        type: String,
        cat: ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized"
            , "Weather"], message: "Value is not supported"
    },
    description: {
        type: String,
        required:true
    },
    thumbnail: {
        type: String,
        required:true
    },
    creator:   { type: Schema.Types.ObjectId, ref: "usermodal" }
    
   
    
},{timestamps:true})


const postmodal = mongoose.model("Posts", postschema)

module.exports=postmodal