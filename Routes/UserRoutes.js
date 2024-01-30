const express = require("express")
const { registeruser, loginuser, getuser, getallusers, changeavatar, edituser } = require("../Controllers/Usercontroller")
const router = express.Router()
const multer = require("multer")
const path = require("path")

const upload = multer({ dest: './uploads' })




router.post('/register', registeruser)

router.post('/login', loginuser)

router.get('/:id', getuser)

router.get('/', getallusers)

router.post('/change_avatar/:id',upload.single('avatar'), changeavatar)

router.patch('/edit_user/:id',edituser)


module.exports=router