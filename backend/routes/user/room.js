const express = require('express');
const router = express.Router();

const {userLoginCheck} = require("../../middlewares/userLoginCheck");

const {createRoom, getRoom, updateRoom} = require("../../controllers/user/room");

router.post("/create", userLoginCheck, createRoom);
router.put("/update/:id", userLoginCheck, updateRoom);
router.get("/", userLoginCheck, getRoom);

module.exports = router;