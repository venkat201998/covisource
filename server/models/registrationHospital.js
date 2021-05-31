const mongoose = require("mongoose");

const registrationHospitalSchema = new mongoose.Schema(
    {
        email: String,
        hospitalName: String,
        streetAddress: String,
        
        state: String,
        city: String,
        pinCode: String,
        contact: String,

        generalBeds: String,
        icuBeds: String,
        ventilatorBeds: String,
        oxygenBeds: String
        
    },
    {timestamps: true}
);

module.exports = mongoose.model("RegistrationHospital", registrationHospitalSchema);