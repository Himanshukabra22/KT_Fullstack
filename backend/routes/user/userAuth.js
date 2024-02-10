const express = require("express");
const app = express();
const router = express.Router();

const { Login, Register } = require("../../controllers/auth/userAuth");
const { adminLoginCheck } = require("../../middlewares/adminLoginCheck");


router.post("/login", Login);
router.post("/register", adminLoginCheck, Register);

module.exports = router;