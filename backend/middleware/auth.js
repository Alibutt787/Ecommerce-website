const user = require("../model/user");
const ayscErrorHandler = require("./ayscErrorHandler");
const ErrorHandler = require("./errorhandler");
const jwt= require('jsonwebtoken');

exports.isAuthenticated=ayscErrorHandler(async(req,res,next)=>{

    const {token}= req.cookies;
    if(!token){
        return next(new ErrorHandler("user is not authenticate to for this access"));
    }
    const decodedata= jwt.verify(token,process.env.jwt_Sceret);
    req.user= await user.findById(decodedata.id);
 
    next();
})
exports.authorizedRoles=(...roles)=>{
return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        next( new ErrorHandler("this user Role cannot get access this resource"))
    }
    next();
}
}