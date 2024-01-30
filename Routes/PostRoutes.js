const express = require("express")
const { createpost, getallposts, getpost, editpost, getcategoryposts, getuserposts, deletepost } = require("../Controllers/Postcontroller")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const { authmiddleware } = require("../Common")



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"uploads/")
    },
    filename: function (req, file, cb) {
        const unique = Date.now();
        cb(null, unique + file.originalname)
    }
})


const upload = multer({storage:storage})

router.post('/',upload.single('thumbnail'),authmiddleware, createpost)

router.get('/', getallposts)

router.get('/:id', getpost)

router.patch('/edit/:id',upload.single('thumbnail'), editpost)

router.delete('/:id',authmiddleware, deletepost)

router.get('/categories/:category', getcategoryposts)

router.get('/users/:id', getuserposts)



module.exports=router