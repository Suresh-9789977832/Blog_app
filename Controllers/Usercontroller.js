const path = require("path")
const { hashedpassword, comparepassword, createtoken } = require("../Common")
const usermodal = require("../Modal/Usermodal")
const fs=require("fs")
const {v4:uuid}=require("uuid")



const registeruser = async (req, res) => {

    try {
        let name = req.body.name
        let email=req.body.email
        let password = req.body.password
        
        if (name && email && password) {
            password = await hashedpassword(password)
            let newemail=email.toLowerCase()
            const user = await usermodal.findOne({ email: newemail })
            if (!user) {
                if (!password.trim().length < 6) {
                    let data=await usermodal.create({name,email:newemail,password})
                    res.status(200).send({
                    message: "user created successfully",
                    data
                    })
                
                       
                    } else{
                
                     return res.status(400).send({
                            message:'Password must be atleast 6 characters'
                       })
        
                }
                

                
            } else {
                res.status(400).send({
                    message:"User already exists"
                })
            }
        }
        else {
            res.status(400).send({
                message:"Fill all the field"
            })
        }
        

    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }

}

const loginuser = async(req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password
        if (email && password) {
            let newemail = email.toLowerCase()
            let user = await usermodal.findOne({ email: newemail })
            if (user) {
                if (await comparepassword(password, user.password)) {
                    const token = await createtoken({ name: user.name, email: user.email, id: user._id })
                    res.status(200).json({
                        token,
                        id: user._id,
                        name:user.name
                    })
                } else {
                    res.status(400).send({
                        message:"Please enter valid password"
                    }) 
                }
            }
            else {
                res.status(400).send({
                    message:"Please enter valid email id"
                }) 
            }
        }
        else {
            res.status(400).send({
                message:"Fill all the field"
            })
        }

        
        
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const getuser = async(req, res) => {
    const {id} = req.params
    const user = await usermodal.findById(id).select('-password')
    if (!user) {
        res.status(400).json("user not found")
    }
   
        res.status(200).json(user)



}


const changeavatar = async(req, res) => {
    try {
        const id = req.params.id
        if (!req.file)
            res.status(400).json('Please choose an image')
            
        else {

            const user = await usermodal.findById(id)
            if (user.avatar) {
                fs.unlink(path.join(__dirname, "..", 'uploads', user.avatar), (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
            }
            const avatar = req.file
            
            // if (avatar.size > 50000) {
            //     return res.status(400).json("Profile is too big. should be less than 500kb")
            // }
                // image.jpg
            let name = avatar.originalname;
            let splittedname = name.split(".")
            let newfilename = splittedname[0] + uuid() + "." + splittedname[splittedname.length - 1]
            avatar.mv(path.join(__dirname, "..", 'uploads', newfilename), async (err) => {
                if (err) {
                    return res.status(400).json("error")
                }
            })

            const update = await usermodal.findByIdAndUpdate(id, { avatar: newfilename }, { new: true })
            
            if (!update) {
                    return res.status(400).jons("Avatar Couldn't be changed")
            }
            res.status(200).json(update)
            
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const edituser = async(req, res) => {
    try {
        const id=req.params.id
        const { name, email, password,newpassword } = req.body
        if (!name || !email || !password || !newpassword) {
            return res.status(400).json("Fill in all field")
        }

        const user = await usermodal.findById(id)
        if (!user) {
            res.status(400).json("user not found")
        }
        




    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }




    
}   


const getallusers = async(req, res) => {
    try {
        const user = await usermodal.find()
        res.json(user)
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}   


module.exports = {
    loginuser,
    registeruser,
    getuser,
    changeavatar,
    edituser,
    getallusers
}