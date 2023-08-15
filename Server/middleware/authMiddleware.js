const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const secretKey = 'secret'

//VERIFYING JWT TOKEN

const verifyToken = (req,res,next) => {

    // const token = req.cookies.token;
    const token = req.headers['authorization']?.replace('Bearer ' , '') || req.cookies.token;
    console.log(token)
    if(!token) {
        return res.status(401).json({
            message: 'Access denied, Token missing'
        })
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.user_id;
        next();
    }
    catch(error) {
        return res.status(400).json({
            message: 'Invalid Token'
        })
    }
}


//ISADMIN CHECKING

const isAdmin = async (req,res,next) => {

    try {
        const user = await User.findOne({id:req.userId});
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'You are not authorized to access this resource'
        })
    }
}

module.exports = {
    verifyToken,
    isAdmin
}