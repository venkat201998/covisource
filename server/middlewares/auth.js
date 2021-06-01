const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
    try{
        const user = await admin
            .auth()
            .verifyIdToken(req.headers.idtoken);
        req.user = user;
        next();
    }catch(error){
        res.status(401).json({
            err: "Invalid or expired token",
        });
    }
}

exports.adminCheck = async (req, res, next) => {
    try{
        const { email } = req.user;
        const admin = await User.findOne({email});
        if(admin.type === "Admin"){
            next();
        }
        else{
            res.json("You are not allowed to this operation")
        }
    }catch(error){
        res.status(401).json({
            err: "Invalid or expired token",
        });
    }
}