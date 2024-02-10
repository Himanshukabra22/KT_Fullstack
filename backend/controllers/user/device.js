const mongoose = require("mongoose");
require("dotenv").config();

const deviceSchema = require("../../db/models/device.js");
const userSchema = require("../../db/models/user.js");

const updateDevice = async (req, res) => {
  try {
    let update = req.body;
    let user = await userSchema.findOne({ username: req.user.username });

    //check if device exists for the user
    let found = false;
    for (let i = 0; i < user.devices.length; i++) {
      let cmp = user.devices[i].deviceId.toString();
      if (cmp == req.params.id) {
        found = true;
      }
    }
    if (!found) {
      return res
        .status(400)
        .send({ status: "not ok", msg: "device not found." });
    }

    let updatedDevice = await deviceSchema.findOneAndUpdate(
      { _id: req.params.id },
      update
    );

    if (updatedDevice) {
      res.status(200).json(updatedDevice);
    } else {
      res.status(400).send({ status: "not ok", msg: "device not updated." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "not ok", msg: "device not updated." });
  }
};

const getDevice = async (req, res) => {
  try {
    let user = await userSchema.find({ username: req.user.username });
    let devices = [];
    for (let i = 0; i < user[0].devices.length; i++) {
      let device = await deviceSchema.findOne({
        _id: user[0].devices[i].deviceId,
      });
      devices.push(device);
    }
    if (user) {
      res.status(200).send({ status: "ok", devices });
    } else {
      res.status(400).send({ status: "not ok", msg: "devices not found." });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).send({ status: "not ok", msg: "devices not found." });
    }
  }
};

module.exports = {
  getDevice,
  updateDevice,
};
