const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser, currentUser, checkUser, createHospital, checkHospital, updateHospital, registerPatientFromHospital, registerPatientFromUser, addSlotFromHospital, getInactiveHospitals, updateHospitalStatus, removeHospital, getHospitals, updatePatientStatus, getUsers, updateUser, confirmPatient, rejectPatient} = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/check-user", checkUser);
router.post("/current-user", authCheck, currentUser);
router.post("/create-hospital-details",authCheck, createHospital);
router.post("/check-hospital", checkHospital);
router.post("/update-hospital", authCheck, updateHospital);
router.post("/register-patient-from-hospital", authCheck, registerPatientFromHospital);
router.post("/register-patient-from-user", authCheck, registerPatientFromUser);
router.post("/add-slot", authCheck, addSlotFromHospital);
router.get("/get-inactive-hospitals", authCheck, adminCheck, getInactiveHospitals);
router.post("/update-hospital-status", authCheck, adminCheck, updateHospitalStatus);
router.post("/remove-hospital", authCheck, adminCheck, removeHospital);
router.get("/get-hospitals", getHospitals);
router.post("/update-patient-status", authCheck, updatePatientStatus);
router.get("/get-users", authCheck, adminCheck, getUsers);
router.post("/update-user", authCheck, adminCheck, updateUser);
router.post("/confirm-patient", authCheck, confirmPatient);
router.post("/reject-patient", authCheck, rejectPatient);
module.exports = router;