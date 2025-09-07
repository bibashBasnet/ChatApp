const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({message: "Token is required"});
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next();
    }catch(e){
        res.status(403).json({message: "Invalid Token"})
    }
}