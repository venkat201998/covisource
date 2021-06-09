const User = require("../models/user");
const Hospital = require("../models/hospital");

exports.createOrUpdateUser = async(req, res) => {
    try {
        const { email } = req.user;
        const {firstName, lastName, dob, gender, contact, address, state, city, pinCode, type} = req.body.userDetails;
        const user = await User.findOneAndUpdate({email}, {firstName, lastName, dob, gender, contact, address, state, city, pinCode, type}, {new: true});
        if(user){
            res.json(user);
        }else{
            const newUser = await new User({ firstName, lastName, dob, gender, email, contact, address, state, city, pinCode, type}).save();
            if(newUser){
                res.json(newUser);
            }
            else{
                res.json("Failed To Register");
            }
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
        const user = await User.findOne({email});
        if(user){
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
        }else{
            res.json("No User Exists With The Email Provided");
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
        let email;
        if(req.body.hospitalDetails.email){
            email = req.body.hospitalDetails.email;
        }else{
            email = req.user.email;
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
        const email = req.body.hospitalEmail;
        const hospital = await Hospital.findOne({email});
        const patients = hospital.patients;
        const checkPatient = patients.findIndex((patient)=> patient.email===(req.body.patientDetails.email));
        console.log(checkPatient);
        if(checkPatient>=0){
            res.json("Patient Already registered with these details");
        }
        else{

            patients.push(req.body.patientDetails);
            console.log("Data from forntend:", req.body.patientDetails)

            const bedType = req.body.patientDetails.bedType;
            const updateHospital=[];
            if(bedType==="generalBeds"){
                const bedTypeCount = parseInt(hospital.generalBeds)-1;
                updateHospital = await Hospital.findOneAndUpdate({email},{generalBeds: bedTypeCount, patients }, {new: true} )
            }
            else if(bedType==="icuBeds"){
                const bedTypeCount = parseInt(hospital.icuBeds)-1;
                updateHospital = await Hospital.findOneAndUpdate({email},{icuBeds: bedTypeCount, patients }, {new: true} )
            }

            else if(bedType==="ventilatorBeds"){
                const bedTypeCount = parseInt(hospital.ventilatorBeds)-1;
                updateHospital = await Hospital.findOneAndUpdate({email},{ventilatorBeds: bedTypeCount, patients }, {new: true} )
            }

            else if(bedType==="oxygenBeds"){
                const bedTypeCount = parseInt(hospital.oxygenBeds)-1;
                updateHospital = await Hospital.findOneAndUpdate({email},{oxygenBeds: bedTypeCount, patients }, {new: true} )
            }

            if(updateHospital){
                res.json(updateHospital);
            }
            else{
                res.json("Update Failed");
            }
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

exports.updatePatientStatus = async (req, res) => {
    
    try{
        const { email } = req.user;
        const {patientUpdatedDetails, id} = req.body;
        const { eFirstName, eLastName, relationship, eContact, status, comments } = patientUpdatedDetails;
        const hospital = await Hospital.findOne({email});
        const patients = hospital.patients;

        const patientIndex = patients.findIndex((patient)=> patient._id == id);
        const bedType= patients[patientIndex].bedType;
        const updatedHospital=[];

        patients[patientIndex].eFirstName = eFirstName;
        patients[patientIndex].eLastName = eLastName;
        patients[patientIndex].relationship = relationship;
        patients[patientIndex].eContact = eContact;
        patients[patientIndex].status = status;
        patients[patientIndex].comments = comments;
        patients[patientIndex].updatedDate = Date.now();



        if(status === "Deceased" || status === "Discharged"){
            if(bedType === "generalBeds"){
                const bedTypeCount = parseInt(hospital.generalBeds) + 1;
                updatedHospital = await Hospital.findOneAndUpdate({email},{generalBeds: bedTypeCount, patients }, {new: true} );
            }
            else if(bedType === "icuBeds"){
                const bedTypeCount = parseInt(hospital.icuBeds) + 1;
                console.log(bedTypeCount);
                updatedHospital = await Hospital.findOneAndUpdate({email},{icuBeds: bedTypeCount, patients }, {new: true} );
            }
            else if(bedType === "ventilatorBeds"){
                const bedTypeCount = parseInt(hospital.ventilatorBeds) + 1;
                updatedHospital = await Hospital.findOneAndUpdate({email},{ventilatorBeds: bedTypeCount, patients }, {new: true} );
            }
            else if(bedType === "oxygenBeds"){
                const bedTypeCount = parseInt(hospital.oxygenBeds) + 1;
                updatedHospital = await Hospital.findOneAndUpdate({email},{oxygenBeds: bedTypeCount, patients }, {new: true} );
            }
        }
        else if(status === "Admitted"){
            if(bedType === "generalBeds"){
                const bedTypeCount = parseInt(hospital.generalBeds) - 1;
                updatedHospital = await Hospital.findOneAndUpdate({email},{generalBeds: bedTypeCount, patients }, {new: true} );
            }
            else if(bedType === "icuBeds"){
                const bedTypeCount = parseInt(hospital.icuBeds) - 1;
                console.log(bedTypeCount);
                updatedHospital = await Hospital.findOneAndUpdate({email},{icuBeds: bedTypeCount, patients }, {new: true} );
            }
            else if(bedType === "ventilatorBeds"){
                const bedTypeCount = parseInt(hospital.ventilatorBeds) - 1;
                updatedHospital = await Hospital.findOneAndUpdate({email},{ventilatorBeds: bedTypeCount, patients }, {new: true} );
            }
            else if(bedType === "oxygenBeds"){
                const bedTypeCount = parseInt(hospital.oxygenBeds) - 1;
                updatedHospital = await Hospital.findOneAndUpdate({email},{oxygenBeds: bedTypeCount, patients }, {new: true} );
            }
        }
        else{
            updatedHospital = await Hospital.findOneAndUpdate({email},{ patients }, {new: true} );
        }
        
        
        if(updatedHospital){
            res.json(updateHospital);
        }
        else{
            res.json("Update failed");
        }
    }catch(error){
        res.json(error)
    }
}

exports.getUsers = async (req, res) => {
    try{
        const users = await User.find({});
        if(users){
            res.json(users);
        }else{
            res.json("No User Found");
        }
    }catch(error){
        res.json(error)
    }
}

exports.updateUser = async (req, res) => {
    try{
        const {firstName, lastName, dob, gender, email, contact, address, state, city, pinCode } = req.body.userDetails;
        const user = await User.findOneAndUpdate({email}, {firstName, lastName, dob, gender, email, contact, address, state, city, pinCode});
        const users = await User.find({});

        if(users){
            console.log("Updated Users", users)
            res.json(users);
        }else{
            res.json("No User Found");
        }
    }catch(error){
        res.json(error)
    }
}

exports.confirmPatient = async (req, res) => {
    try{
        const {email, patientId, bookedByEmail} = req.body;
        const hospital = await Hospital.findOne( {email} );
        const patients = hospital.patients;

        const patientIndex = patients.findIndex((patient)=> patient._id == patientId);
        patients[patientIndex].status = "Admitted";
        patients[patientIndex].confirmedDate= Date.now();

        const updateHospital = await Hospital.findOneAndUpdate( {email}, {patients}, {new: true} );
        
        const user = await User.findOne({email: bookedByEmail});
        const bookedSlots = user.bookedSlots;
        const currentSlot = user.currentSlot;

        bookedSlots.push({
            hospitalId: hospital._id,
            hospitalEmail: email,
            patientId: patients[patientIndex]._id,
            patientEmail: patients[patientIndex].email
        });
        console.log("bookedSlots:", bookedSlots);

        currentSlot.hospitalId = hospital._id;
        currentSlot.hospitalEmail = email;
        currentSlot.patientId = patients[patientIndex]._id;
        currentSlot.patientEmail = patients[patientIndex].email;
        
        console.log("currentSlot:", currentSlot);


        const updateUser = await User.findOneAndUpdate({email: bookedByEmail}, { currentSlot, bookedSlots: bookedSlots }, {new: true});

        if(updateHospital && updateUser){
            res.json("Patient Confirmed");
        }else{
            res.json("Failed to confirm Patient");
        }

    }catch(error){
        res.json(error)
    }
}

//used in UserSlot.js
exports.getUser = async (req, res) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({email});

        if(user){
            res.json(user);
        }
        else{
            res.json("User Not found");
        }

    }catch(error){
        res.json(error);
    }
}