const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");


// controller
const { createOrUpdateUser, currentUser, checkUser, createHospital, checkHospital, updateHospital, registerPatient, getInactiveHospitals, updateHospitalStatus, removeHospital, getHospitals} = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/check-user", checkUser);
router.post("/current-user", authCheck, currentUser);
router.post("/create-hospital-details",authCheck, createHospital);
router.post("/check-hospital", checkHospital);
router.post("/update-hospital", authCheck, updateHospital);
router.post("/register-patient", authCheck, registerPatient);
router.get("/get-inactive-hospitals", authCheck, adminCheck, getInactiveHospitals);
router.post("/update-hospital-status", authCheck, adminCheck, updateHospitalStatus);
router.post("/remove-hospital", authCheck, adminCheck, removeHospital);
router.get("/get-hospitals", authCheck, adminCheck, getHospitals);
module.exports = router;