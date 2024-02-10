const express = require("express");
const router = express.Router();

const { userLoginCheck } = require("../../middlewares/userLoginCheck");

const {
  createRoom,
  getRoom,
  updateRoom,
  getFreeDevices,
} = require("../../controllers/user/room");

router.post("/create", userLoginCheck, createRoom);
router.put("/update/:id", userLoginCheck, updateRoom);
router.get("/", userLoginCheck, getRoom);
router.get("/freedevices", userLoginCheck, getFreeDevices);

module.exports = router;
