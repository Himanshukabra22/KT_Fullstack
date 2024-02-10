const mongoose = require("mongoose");
require("dotenv").config();

const deviceSchema = require("../../db/models/device.js");
const userSchema = require("../../db/models/user.js");

const createDevice = async (req, res) => {
  try {
    let isCreated = await deviceSchema.create(req.body);
    if (isCreated) {
      res.status(200).send({ status: "ok", msg: "device created." });
    } else {
      res.status(400).send({ status: "not ok", msg: "device not created." });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).send({ status: "not ok", msg: "device not created." });
    }
  }
};

// const updateDevice = async (req, res) => {
//   try {
//     let update = req.body;

//     let updatedDevice = await deviceSchema.findOneAndUpdate(
//       { _id: req.params.id },
//       update
//     );

//     if (updatedDevice) {
//       res.status(200).json(updatedDevice);
//     } else {
//       res.status(400).send({ status: "not ok", msg: "device not updated." });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ status: "not ok", msg: "device not updated." });
//   }
// };

const getDevice = async (req, res) => {
  try {
    let device = await deviceSchema.find();
    if (device) {
      res.status(200).send({ status: "ok", device });
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

const getDeviceByUsername = async (req, res) => {
  try {
    let user = await userSchema.find({ username: req.params.username });
    let devices = [];
    for (let i = 0; i < user[0].devices.length; i++) {
      let device = await deviceSchema.findOne({ _id: user[0].devices[i].deviceId });
      devices.push(device);
    }
    if (user) {
      res.status(200).send({ status: "ok", devices});
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

const addUser = async (req, res) => {
  try {
    let device = await deviceSchema.findOne({ _id: req.params.id });
    let user = await userSchema.findOne({ username: req.body.username });
    if (device && user) {
        device.alloted_to_user = user._id;
        user.devices.push({deviceId : device._id, allocated: false});
        let isUpdatedUser = await user.save();
        let isUpdatedDevice = await device.save();
        
        if (isUpdatedUser && isUpdatedDevice) {
          res.status(200).send({ status: "ok", msg: "user added to device." });
        } else {
          res
            .status(400)
            .send({ status: "not ok", msg: "user not added to device." });
        }
      } else {
        res
          .status(400)
          .send({ status: "not ok", msg: "user or device not found." });
      }
    // }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "not ok", msg: "devices not found." });
  }
};

module.exports = {
  createDevice,
  getDevice,
  getDeviceByUsername,
  addUser,
};
