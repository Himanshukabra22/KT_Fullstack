const express = require("express");
const app = express();
const router = express.Router();

const {getUser} = require("../../controllers/admin/user");
const { adminLoginCheck } = require("../../middlewares/adminLoginCheck");

router.get("/user", adminLoginCheck, getUser);

module.exports = router;