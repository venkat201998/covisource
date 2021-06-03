const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true
        },
        hospitalName: String,
        streetAddress: String,
        
        state: String,
        city: String,
        pinCode: String,
        contact: String,

        generalBeds: String,
        icuBeds: String,
        ventilatorBeds: String,
        oxygenBeds: String,

        status: String,
        
        patients:[
            {
                firstName: String,
                lastName: String,
                dob: String,
                gender:String,
                email: String,
                contact: String,
                address: String,
                state: String,
                city:String,
                pinCode: String,
                maritalStatus: String,
                
                eFirstName: String,
                eLastName: String,
                relationship: String,
                eContact: String,

                weight: String,
                height: String,
                medicationStatus: String,
                medicationList: String,
                medicationAllergies: String,
                operationsList: String,
                healthIssuesChecked: Array,
                covidSymptomsChecked: Array,
                status: String,
                comments: String,
                createdDate:{
                    type:Date,
                    default: Date.now
                },
                updatedDate:{
                    type:Date,
                    default: Date.now
                },
            },
            
        ]
        
    },
    {timestamps: true}
);

module.exports = mongoose.model("Hospital", HospitalSchema);