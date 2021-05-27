const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
    console.log("Type of user: ", req.body.type);
    try{
        const { email, name, picture } = req.user;
        const user = await User.findOneAndUpdate({email},{firstName: email.split('@')[0], picture, type}, {new: true});
        if(user){
            console.log("User Updated");
            res.json(user);
        }else{
            const newUser = await new User({email: email, firstName: email.split('@')[0], picture, type}).save();
            console.log("User Created");
            res.json(newUser);
        }
    }catch(error){
        res.json(error);
    }
};  