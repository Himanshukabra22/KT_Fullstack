const express = require("express");
const app = express();
const router = express.Router();

const {createDevice, getDevice, getDeviceByUsername, addUser} = require("../../controllers/admin/device");
const { adminLoginCheck } = require("../../middlewares/adminLoginCheck");

router.post("/create",adminLoginCheck, createDevice);
router.get("/",adminLoginCheck, getDevice);
router.get("/:username",adminLoginCheck, getDeviceByUsername);
// router.put("/update/:id",adminLoginCheck, updateDevice);
router.put("/adduser/:id",adminLoginCheck, addUser);

module.exports = router;