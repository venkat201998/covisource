const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email:{
            type: String,
            required: true,
            index: true,
        },
        phoneNumber:{
            type: int,
            required: true
        },
        gender: String,
        DOB: Date,
        address:[
            {city: String},
            {district: String},
            {state: String},
            {pinCode: String},
        ]
    },
    {timestamps: true}
)

module.export = mongoose.Schema("User", userSchema);