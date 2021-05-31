const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");


// controller
const { createOrUpdateUser, currentUser, checkUser, createHospitalDetails, checkIfUserRegisteredHospital } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/check-user", checkUser);
router.post("/current-user", authCheck, currentUser);
router.post("/create-hospital-details", createHospitalDetails)
router.post("/check-if-user-registered-hospital", checkIfUserRegisteredHospital)
module.exports = router;