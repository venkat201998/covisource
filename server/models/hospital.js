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
                lastName: String
            }
        ]
        
    },
    {timestamps: true}
);

module.exports = mongoose.model("Hospital", HospitalSchema);