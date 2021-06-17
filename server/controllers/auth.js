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
        const status = "Active";
        const hospitals = await Hospital.find({status});
        if(updateHospital){
            res.json({
                updateHospital: updateHospital,
                hospitals: hospitals
            });
        }
        else{
            res.json("Update Failed");
        }
    }
    catch(error){
        res.json(error);
    }
}

exports.registerPatientFromHospital = async(req, res) => {
    try{
        const patientEmail = req.body.patientDetails.email;
        const user = await User.findOne({email: patientEmail});
        
        if(user){
            const { email } = req.user;
            const hospital = await Hospital.findOne({email});
            const patients = hospital.patients;
            const checkPatient = patients.findIndex((patient)=> patient.email===(patientEmail));
            if(checkPatient>=0){
                res.json("Patient Already registered with these details");
            }
            else{

                patients.push(req.body.patientDetails);

                const bedType = req.body.patientDetails.bedType;
                let updateHospital=[];
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
        else{
            res.json("User Not Registered");
        }

    }
    catch(error){
        res.json(error);
    }
}

exports.registerPatientFromUser = async(req, res) =>{
    try{
        const { patientDetails, slug } = req.body;
        const { email } = req.user;

        const user = await User.findOne({email});
        const slots = user.slots;
        const checkSlot = slots.findIndex((slot) => slot.patientEmail === patientDetails.email);
        const hospital = await Hospital.findOne({_id: slug});
        if(hospital){
            const patients = hospital.patients;
            const checkPatient = patients.findIndex((patient)=> patient.email===(patientDetails.email));
            
            if(checkPatient>=0 && checkSlot>=0){
                
                res.json("Patient Already registered with these details");
            }
            
            else if(checkPatient>=0 && (patients[checkPatient].status==="OnHold" || patients[checkPatient].status==="Admitted")){
                    res.json("Patient either admitted or onhold by another user");
            }
            else{
                patients.push(patientDetails);
                const bedType = patientDetails.bedType;
                let updateHospital=[];

                if(bedType==="generalBeds"){
                    const bedTypeCount = parseInt(hospital.generalBeds)-1;
                    updateHospital = await Hospital.findOneAndUpdate({_id: slug},{generalBeds: bedTypeCount, patients }, {new: true} );

                }
                else if(bedType==="icuBeds"){
                    const bedTypeCount = parseInt(hospital.icuBeds)-1;
                    updateHospital = await Hospital.findOneAndUpdate({_id: slug},{icuBeds: bedTypeCount, patients }, {new: true} )
                }

                else if(bedType==="ventilatorBeds"){
                    const bedTypeCount = parseInt(hospital.ventilatorBeds)-1;
                    updateHospital = await Hospital.findOneAndUpdate({_id: slug},{ventilatorBeds: bedTypeCount, patients }, {new: true} )
                }

                else if(bedType==="oxygenBeds"){
                    const bedTypeCount = parseInt(hospital.oxygenBeds)-1;
                    updateHospital = await Hospital.findOneAndUpdate({_id: slug},{oxygenBeds: bedTypeCount, patients }, {new: true} )
                }

                if(updateHospital){
                    
                    if(user){
                        
                        slots.push({
                            hospitalEmail: updateHospital.email,
                            patientEmail: patientDetails.email,
                            slotStatus: patientDetails.status
                        })
                        const updateUser = await User.findOneAndUpdate({email}, {slots}, {new: true});
                        const updateHospitals = await Hospital.find();
                        if(updateUser){
                            res.json({
                                user: updateUser,
                                hospital: updateHospital,
                                hospitals: updateHospitals
                            })
                        }
                        else{
                            res.json("Failed To Update User");
                        }
                    }
                    else{
                        res.json("User Not Registered");
                    }
                    
                }
                else{
                    res.json("Failed To Update Hospital");
                }
            }
        }
        else{
            res.json("Hospital Not Registered");
        }
    }
    catch(error){
        res.json(error)
    }
}

exports.addSlotFromHospital = async(req, res) => {
    try{
        const { email } = req.user;
        const { patientEmail, patientStatus } = req.body;

        const user = await User.findOne({email: patientEmail});
        if(user){
            const slots = user.slots;
            slots.push({
                hospitalEmail: email,
                patientEmail: patientEmail,
                slotStatus: patientStatus
            })
            const updatedUser = await User.findOneAndUpdate({email: patientEmail}, { slots }, {new: true});
            if(updatedUser){
                res.json(updatedUser);
            }
            else res.json("Failed to update");
        }
        else{
            res.json("User Not Registered");
        }


    }catch(error){
        res.json(error)
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
        const status = "Active";
        const hospitals = await Hospital.find({status}); 
        if(removeHospital){
            res.json({
                removeHospital,
                hospitals
            });
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

exports.hospitalsList = async(req, res) => {
    try{
        const { page } = req.body;
        const currentPage = page || 1;
        const perPage = 2; // 3
        const status = "Active";
        const activeHospitals = await Hospital.find({status})
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .exec();
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
        let updatedHospital=[];

        patients[patientIndex].eFirstName = eFirstName;
        patients[patientIndex].eLastName = eLastName;
        patients[patientIndex].relationship = relationship;
        patients[patientIndex].eContact = eContact;
        patients[patientIndex].status = status;
        patients[patientIndex].comments = comments;
        patients[patientIndex].updatedDate = Date.now();

        const user = await User.findOne({email: patients[patientIndex].bookedBy});
        const slots = user.slots;
        const slotIndex = slots.findIndex((slot) => (slot.patientEmail===patients[patientIndex].email && slot.hospitalEmail===email))
        slots[slotIndex].slotStatus = status;

        const updateUser = await User.findOneAndUpdate({email: patients[patientIndex].bookedBy}, {slots}, {new:true});


        if(status === "Deceased" || status === "Discharged"){
            if(bedType === "generalBeds"){
                const bedTypeCount = parseInt(hospital.generalBeds) + 1;
                updatedHospital = await Hospital.findOneAndUpdate({email},{generalBeds: bedTypeCount, patients }, {new: true} );
            }
            else if(bedType === "icuBeds"){
                const bedTypeCount = parseInt(hospital.icuBeds) + 1;
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
        
        if(updatedHospital && updateUser){
            res.json({
                hospital: updatedHospital,
                user: updateUser});
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
        const { patientEmail, bookedBy } = req.body;
        const { email } = req.user;
        const hospital = await Hospital.findOne( {email} );
        const patients = hospital.patients;

        const patientIndex = patients.findIndex((patient)=> (patient.bookedBy === bookedBy && patient.email === patientEmail));
        patients[patientIndex].status = "Admitted";
        patients[patientIndex].confirmedDate= Date.now();

        const updateHospital = await Hospital.findOneAndUpdate( {email}, {patients}, {new: true} );

        const user = await User.findOne({email: bookedBy});
        const slots = user.slots;
        const slotIndex = slots.findIndex((slot) => (slot.patientEmail===patients[patientIndex].email && slot.hospitalEmail===email))
        slots[slotIndex].slotStatus = "Admitted";
        
        const updateUser = await User.findOneAndUpdate({email: bookedBy}, {slots}, {new:true});
    
        if(updateHospital && updateUser){
            res.json({
                hospital: updateHospital,
                user: updateUser});
        }else{
            res.json("Failed To Confirm Patient");
        }

    }catch(error){
        res.json(error)
    }
}

exports.rejectPatient = async (req, res) => {
    try{
        const { patientEmail, bookedBy } = req.body;
        const { email } = req.user;

        const hospital = await Hospital.findOne({email});
        const patients = hospital.patients;
        const patientIndex = patients.findIndex((patient) => (patient.bookedBy === bookedBy && patient.email === patientEmail));
        patients[patientIndex].status = "Rejected";
        patients[patientIndex].confirmedDate= Date.now();
        let updatedHospital=[];

        if(patients[patientIndex].bedType === "generalBeds"){
            const bedTypeCount = parseInt(hospital.generalBeds) + 1;
            updatedHospital = await Hospital.findOneAndUpdate({email},{generalBeds: bedTypeCount, patients }, {new: true} );
        }
        else if(patients[patientIndex].bedType === "icuBeds"){
            const bedTypeCount = parseInt(hospital.icuBeds) + 1;
            updatedHospital = await Hospital.findOneAndUpdate({email},{icuBeds: bedTypeCount, patients }, {new: true} );
        }
        else if(patients[patientIndex].bedType === "ventilatorBeds"){
            const bedTypeCount = parseInt(hospital.ventilatorBeds) + 1;
            updatedHospital = await Hospital.findOneAndUpdate({email},{ventilatorBeds: bedTypeCount, patients }, {new: true} );
        }
        else if(patients[patientIndex].bedType === "oxygenBeds"){
            const bedTypeCount = parseInt(hospital.oxygenBeds) + 1;
            updatedHospital = await Hospital.findOneAndUpdate({email},{oxygenBeds: bedTypeCount, patients }, {new: true} );
        }


        

        const user = await User.findOne({email: bookedBy});
        const slots = user.slots;
        const slotIndex = slots.findIndex((slot) => (slot.patientEmail===patients[patientIndex].email && slot.hospitalEmail===email))
        slots[slotIndex].slotStatus = "Rejected";
        const updateUser = await User.findOneAndUpdate({email: bookedBy}, {slots}, {new:true});
    
        if(updatedHospital && updateUser){
            res.json({
                hospital: updatedHospital,
                user: updateUser});
        }
        else {
            res.json("Failed To Reject Patient");
        }
    }
    catch(error){
        res.json(error);
    }
}

exports.UpdateSlotStatus = async (req, res) => {
    try{
        const { patientEmail, bedType, hospitalEmail } = req.body;
        const { email } = req.user;

        const hospital = await Hospital.findOne({email: hospitalEmail});

        const patients = hospital.patients;

        const patientIndex = patients.findIndex((patient) => (patient.email === patientEmail && patient.bookedBy === email));

        patients[patientIndex].status = "OnHold";
        patients[patientIndex].bedType = bedType;
        patients[patientIndex].createdDate= Date.now();
        patients[patientIndex].updatedDate= Date.now();

        let updatedHospital=[];

        if(bedType === "generalBeds"){
            const bedTypeCount = parseInt(hospital.generalBeds) - 1;
            updatedHospital = await Hospital.findOneAndUpdate({email: hospitalEmail},{generalBeds: bedTypeCount, patients }, {new: true} );
        }
        else if(bedType === "icuBeds"){
            const bedTypeCount = parseInt(hospital.icuBeds) - 1;
            updatedHospital = await Hospital.findOneAndUpdate({email: hospitalEmail},{icuBeds: bedTypeCount, patients }, {new: true} );
        }
        else if(bedType === "ventilatorBeds"){
            const bedTypeCount = parseInt(hospital.ventilatorBeds) - 1;
            updatedHospital = await Hospital.findOneAndUpdate({email: hospitalEmail},{ventilatorBeds: bedTypeCount, patients }, {new: true} );
        }
        else if(bedType === "oxygenBeds"){
            const bedTypeCount = parseInt(hospital.oxygenBeds) - 1;
            updatedHospital = await Hospital.findOneAndUpdate({email: hospitalEmail},{oxygenBeds: bedTypeCount, patients }, {new: true} );
        }

        const user = await User.findOne({email});
        const slots = user.slots;
        const slotIndex = slots.findIndex((slot) => (slot.hospitalEmail === hospitalEmail && slot.patientEmail === patientEmail))
        slots[slotIndex].slotStatus = "OnHold";

        const updatedUser = await User.findOneAndUpdate({email}, {slots}, {new: true});

        const hospitals = await Hospital.find();

        if(updatedHospital && updatedUser){
            res.json({
                hospital: updatedHospital,
                user: updatedUser,
                hospitals: hospitals
            })
        }
        else{
            res.json("Failed To Update Slot");
        }
    }
    catch(error){
        res.json(error);
    }
}