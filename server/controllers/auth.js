const User = require("../models/user");
const RegistrationHospital = require("../models/registrationHospital");

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

exports.checkUser = async(req, res) =>{
    try{
        const email = req.body.email;
        const user = await User.findOne({email});
        console.log(user);
        if(user){
            console.log("User already exists");
            console.log("type:", user.type);
            res.json(user.type);
        }
        else{
            console.log("User Not found");
            res.json("User not found");
        }
    } catch(error){
        res.json(error);
    }
}

exports.currentUser = async(req, res) => {
    try{
        const { email } = req.user;
        const user = await User.findOne({ email });
        if(user){
            res.json(user);
        }
        else{
            res.json("User not found");
        }
    }
    catch(error){
        res.json(error);
    }
}

exports.createHospitalDetails = async(req, res)=> {
    try{
        const hospitalDetails = req.body.hospitalDetails;
        const email = req.body.email;
        console.log(hospitalDetails, email);

        const newHospital = await new RegistrationHospital({
            email: email,
            hospitalName: hospitalDetails.hospitalName,
            streetAddress: hospitalDetails.address,
            state: hospitalDetails.state,
            city: hospitalDetails.city,
            pinCode: hospitalDetails.pinCode,
            contact: hospitalDetails.contact,
            generalBeds: hospitalDetails.generalBeds,
            icuBeds: hospitalDetails.icuBeds,
            ventilatorBeds: hospitalDetails.ventilatorBeds,
            oxygenBeds: hospitalDetails.oxygenBeds }).save();
        console.log("Hospital created");
        res.json(newHospital);
    }
    catch(error){
        res.json(error);
    }
}

exports.checkIfUserRegisteredHospital = async(req, res) => {
    try{
        const email= req.body.email;
        const hospital = await RegistrationHospital.findOne({email});
        if(hospital){
            res.json(hospital);
        }
        else res.json("Hospital not registered")
    }
    catch(error){
        res.json(error);
    }
}

