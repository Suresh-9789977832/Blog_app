const usermodal = require("../Modal/Usermodal")
const postmodal = require("../Modal/Postmodal")
const path = require("path")
const fs = require("fs")
const { v4: uuid } = require("uuid")




const createpost = async (req, res) => {
    try {
        let { title, category, description } = req.body
        let thumbnail = req.file;
        let image = thumbnail.filename
        console.log(thumbnail)

        if (!title || !category || !description) {
            res.status(400).send({
                message:'Fill in all field and choose thumbnail'
            })
        }

        if (thumbnail.size > 2000000) {
            res.status(400).send({
                message:"Thumbnail too big. File should be less than 2mb."
            })
        }
        else {
            await postmodal.create({ title, category, description, thumbnail: image, creator: req.user.id })

            const currentuser = await usermodal.findById(req.user.id);
            const userpostcount = currentuser.posts + 1;
            await usermodal.findByIdAndUpdate(req.user.id,{posts:userpostcount})
            res.status(200).send({
                message:"post created"
            })
        }

    }
    
    
    catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}




const getallposts = async (req, res) => {
    try {
        const posts = await postmodal.find().sort({ updatedAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
    

}

const  getpost= async(req,res) => {
    try {
        const id = req.params.id
        const user = await postmodal.findById(id)
        if (!user) {
            res.status(400).send({
                message:"Post not found"
            })
        }
        else {
            res.status(200).json(user)
        }
        
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const getcategoryposts = async (req, res) => {
    try {
    const category = req.params.category
        const cat = await postmodal.find({ category }).sort({ createdAt: -1 })
        if (cat) {
            res.status(200).json(cat)
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
    
}

const  getuserposts= async(req,res) => {
    try {
        const id = req.params.id
        const getuserpost = await postmodal.find({ creator: id }).sort({ createdAt: -1 })
        res.status(200).json(getuserpost)

     
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const editpost = async (req, res) => {
    try {
        const title = req.body.title
        const category = req.body.category
        const description=req.body.description
        const thumbnail = req.file
        const id=req.params.id

        // res.status(200).json(title)
console.log(thumbnail)
             
        if (!title || !category || !description) {
            return res.status(400).json("Fill in all fields.")
        }
            if (!thumbnail) {
             await postmodal.findByIdAndUpdate(id,{title,category,description},{new:true})
        }
            else {
                const oldpost = await postmodal.findById(id)
                fs.unlink(path.join(__dirname, "..", "uploads", oldpost.thumbnail), async (err) => {
                    if (err) {
                        return console.log(err)
                    }
                    else {
                        res.status(200).json("file deleted")
                    }
                })
        }
        
    } catch (error) {   
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
   
}

// const editpost = async (req, res) => {
//     try {
        
//         let originalname = req.file
//         console.log(originalname)
//     //    let final=thumbnail.file
//         res.status(200).send({
//             message: "created",
//             originalname
//         })
    
//     } catch (error) {
//         res.status(500).send({
//             message: "Internal server error",
//             errormessage:error.message
//         })
//     }
    
// }




const  deletepost= async(req,res) => {
    const id = req.params.id
    const deletepost = await postmodal.deleteOne({ _id: id })
    if (deletepost) {
        const currentuser = await usermodal.findById(req.user.id)
        const userpostcount = currentuser?.posts - 1
        await usermodal.findByIdAndUpdate(req.user.id,{posts:userpostcount})
    }
    res.status(200).json("Delete post successfully")
}

module.exports = {
    createpost,
    getallposts,
    getcategoryposts,
    getpost,
    getuserposts,
    editpost,
    deletepost
}

