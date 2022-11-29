require('dotenv/config')
const jwt = require('jsonwebtoken')
// =============================================

module.exports = (req, res, next) => {
    try{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const userId = decoded.userId
    req.checkToken = {
        userId: userId
    }
    next()
    } catch(error){ return res.status(403).json({message: "unauthorized request" }) }
}

