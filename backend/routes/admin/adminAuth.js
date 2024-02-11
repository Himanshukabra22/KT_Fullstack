const express = require("express");
const router = express.Router();

// Controllers
const { Login, Register } = require("../../controllers/auth/adminAuth");


router.post("/login", Login);
router.post("/register", Register);

module.exports = router;