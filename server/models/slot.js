const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
    {
        hospitalEmail: String,
        userEmail: String,
        status: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", slotSchema);