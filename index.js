const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors = require("cors")
const UserRoutes = require("./Routes/UserRoutes")
const PostRoutes = require("./Routes/PostRoutes")
const upload = require("express-fileupload")



const PORT=process.env.PORT

const app=express()


app.use(express.json())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use('/users', UserRoutes)
app.use('/posts', PostRoutes)
app.use(upload())
app.use('/uploads',express.static(__dirname + "/uploads"))


app.get('/', (req, res) => {
    res.json("hello welcome to the world of coding")
})


app.listen(`${PORT}`,(()=>console.log(`app is running succfully in ${PORT}`)))