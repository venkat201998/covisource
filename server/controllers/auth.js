const User = require("../models/user");
const HospitalUser = require("../models/hospitalUsers");

exports.createOrUpdateUser = async(req, res) => {
    try {
        const type = req.body.type;
        const { email, name, picture } = req.user;
        const user = await User.findOneAndUpdate({ email }, { firstName: email.split('@')[0], picture, type }, { new: true });
        if (user) {
            console.log("User Updated");
            res.json(user);
        } else {
            const newUser = await new User({ email: email, firstName: email.split('@')[0], picture, type }).save();
            console.log("User Created");
            res.json(newUser);
        }
    } catch (error) {
        res.json(error);
    }
};

exports.createOrUpdateHospitalUser = async(req, res) => {
    try {
        const type = req.body.type;
        const { email, name, picture } = req.user;
        const user = await HospitalUser.findOneAndUpdate({ email }, { firstName: email.split('@')[0], picture, type }, { new: true });
        if (user) {
            console.log("User Updated");
            res.json(user);
        } else {
            const newUser = await new HospitalUser({ email: email, firstName: email.split('@')[0], picture, type }).save();
            console.log("User Created");
            res.json(newUser);
        }
    } catch (error) {
        res.json(error);
    }
};