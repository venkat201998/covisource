const User = require("../models/user");
const Hospital = require("../models/hospital");

exports.createOrUpdateUser = async(req, res) => {
    try {
        const type = req.body.type;
        const { email, name, picture } = req.user;
        const user = await User.findOneAndUpdate({ email }, { firstName: email.split('@')[0], picture, type }, { new: true });
        if (user) {
            res.json(user);
        } else {
            const newUser = await new User({ email: email, firstName: email.split('@')[0], picture, type }).save();
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
        if(user){
            res.json(user.type);
        }
        else{
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

exports.createHospital = async(req, res)=> {
    try{
        const hospitalDetails = req.body.hospitalDetails;
        const email = req.body.email;

        const hospital = await Hospital.findOne({email});
        if(hospital){
            res.json("Hospital already exists");
        }
        else{

            const newHospital = await new Hospital({
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
                oxygenBeds: hospitalDetails.oxygenBeds,
                status: hospitalDetails.status }).save();
            res.json(newHospital);
        }
    }
    catch(error){
        res.json(error);
    }
}

exports.checkHospital = async(req, res) => {
    try{
        const email= req.body.email;
        const hospital = await Hospital.findOne({email});
        if(hospital){
            res.json(hospital);
        }
        else res.json("Hospital not registered")
    }
    catch(error){
        res.json(error);
    }
}

exports.updateHospital = async(req, res) => {
    try{

        if(req.body.hospitalDetails.email){
            const email = req.body.hospitalDetails.email;
        }else{
            const { email } = req.user;
        }
        const hospitalDetails = req.body.hospitalDetails;
        
        const updateHospital = await Hospital.findOneAndUpdate({email},{
            hospitalName: hospitalDetails.hospitalName,
            streetAddress: hospitalDetails.address,
            state: hospitalDetails.state,
            city: hospitalDetails.city,
            pinCode: hospitalDetails.pinCode,
            contact: hospitalDetails.contact,
            generalBeds: hospitalDetails.generalBeds,
            icuBeds: hospitalDetails.icuBeds,
            ventilatorBeds: hospitalDetails.ventilatorBeds,
            oxygenBeds: hospitalDetails.oxygenBeds
            },
            { new: true }
        );
        if(updateHospital){
            res.json(updateHospital);
        }
        else{
            res.json("Update Failed");
        }
    }
    catch(error){
        res.json(error);
    }
}

exports.registerPatient = async(req, res) => {
    try{
        const email = req.body.email;
        const hospital = await Hospital.findOne({email});
        const patients = hospital.patients;

        console.table(req.body.patientDetails);
        patients.push(req.body.patientDetails);
        const updateHospital = await Hospital.findOneAndUpdate({email},{ patients }, {new: true} )
        if(updateHospital){
            res.json(updateHospital);
        }
        else{
            res.json("Update Failed");
        }

    }
    catch(error){
        res.json(error);
    }
}

exports.getInactiveHospitals = async(req, res) => {
    try{
        const status = "Inactive";
        const inActiveHospitals = await Hospital.find({status});
        res.json(inActiveHospitals);
    }catch(error){
        res.json(error)
    }
}

exports.updateHospitalStatus = async(req, res) => {
    try{
        const email = req.body.email;
        const updateHospital = await Hospital.findOneAndUpdate({email},{status: "Active"},{new: true});
        if(updateHospital){
            res.json(updateHospital);
        }else{
            res.json("Failed to update");
        }
    }catch(error){
        res.json(error)
    }
}

exports.removeHospital = async (req, res) => {
    try{
        const email = req.body.email;
        const removeHospital = await Hospital.findOneAndDelete({email});
        if(removeHospital){
            res.json("Hospital Removed Successfully");
        }else{
            res.json("Failed To Remove The Hospital");
        }
    }catch(error){
        res.json(error)
    }
}

exports.getHospitals = async(req, res) => {
    try{
        const status = "Active";
        const activeHospitals = await Hospital.find({status});
        res.json(activeHospitals);
    }catch(error){
        res.json(error)
    }
}