const bcryptjs = require("bcryptjs")
const jwt=require("jsonwebtoken")

const hashedpassword = async (password) => {
    const salt = await bcryptjs.genSalt(10)
    const hashedpassword = await bcryptjs.hash( password,salt)
    return hashedpassword
}

const comparepassword = async (password,hashedpassword)=>{
    let newpassword = await bcryptjs.compare(password, hashedpassword)
    return newpassword
}

const createtoken = async (value) => {
    let token = await jwt.sign(value, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES})
    return token
}

const authmiddleware = async (req, res, next) => {
    const authorization = req.headers.Authorization || req.headers.authorization;

    if (authorization && authorization.startsWith("Bearer")) {
        let token = authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if (err) {
                res.status(401).send({
                    message:"Invalid token"
                })
            }

            req.user = info
            next()
        })
    }
    else {
        return res.json("no token")
    }
}



module.exports = {
    hashedpassword,
    comparepassword,
    createtoken,
    authmiddleware
}