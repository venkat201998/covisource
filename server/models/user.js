const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        dob: String,
        gender:String,
        email:{
            type: String,
            index: true,
            required: true
        },
        contact: String,
        address: String,
        state: String,
        city:String,
        pinCode: String,      
        
        type: {
            type: String,
            required: true
        },
        slots: [
            {
                hospitalEmail: String,
                patientEmail: String,
                slotStatus: String,
            }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);