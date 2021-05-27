const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser, createOrUpdateHospitalUser, currentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
// router.post("/create-or-update-hospital-user", authCheck, createOrUpdateHospitalUser);

module.exports = router;