const admin = require("../firebase");

exports.authCheck = async (req, res, next) => {
    console.log("auth.js/middlewares:", req.headers.idtoken, req.body.type);
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