const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");


// controller
const { createOrUpdateUser, currentUser, checkUser, createHospital, checkHospital, updateHospital, registerPatient} = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/check-user", checkUser);
router.post("/current-user", authCheck, currentUser);
router.post("/create-hospital-details",authCheck, createHospital)
router.post("/check-hospital", checkHospital)
router.post("/update-hospital", authCheck, updateHospital);
router.post("/register-patient", authCheck, registerPatient);
module.exports = router;