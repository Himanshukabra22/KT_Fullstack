const express = require("express");
const app = express();
const router = express.Router();

const {
  getDevice,
  updateDevice,
} = require("../../controllers/user/device");
const { userLoginCheck } = require("../../middlewares/userLoginCheck");

router.get("/", userLoginCheck, getDevice);
router.put("/update/:id", userLoginCheck, updateDevice);

module.exports = router;
