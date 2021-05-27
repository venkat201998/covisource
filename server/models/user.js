const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email:{
            type: String,
            index: true,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        phoneNumber:{
            type: Number,
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
);

module.exports = mongoose.model("User", userSchema);