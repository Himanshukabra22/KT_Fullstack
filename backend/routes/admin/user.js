const express = require("express");
const app = express();
const router = express.Router();

// Controllers
const {getUser} = require("../../controllers/admin/user");

//Middleware
const { adminLoginCheck } = require("../../middlewares/adminLoginCheck");

router.get("/user", adminLoginCheck, getUser);

module.exports = router;