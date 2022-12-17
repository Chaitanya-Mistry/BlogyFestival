const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = authMiddleware = async(req,res,next) => {
    let foundUser;
    try{
        const token = req.cookies.jwtoken;
        // Verify token
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY || "secret_key_123");
        console
        foundUser = await User.findOne({_id:verifyToken.user_id});
    }catch(err){
        return res.status(401).json({message:`Unathorized : Token was not provided ..😒`});
    }

    if(foundUser){
        req.rootUser = foundUser;
        req.userID = foundUser._id;
        // console.log('Succcess .. 🥳')
        next();
    }else{
        return res.status(401).json({message:`Unathorized : Token was provided but user data is tempered ..😒`});
    }
}