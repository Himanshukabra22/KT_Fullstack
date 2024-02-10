const mongoose = require("mongoose");
require("dotenv").config();

const deviceSchema = require("../../db/models/device.js");
const userSchema = require("../../db/models/user.js");
const roomSchema = require("../../db/models/room.js");

const createRoom = async (req, res) => {
  try {
    let user = await userSchema.findOne({ username: req.user.username });
    req.body.user_id = user._id;
    let isRoom = await roomSchema.create(req.body);
    user.rooms.push(isRoom._id);
    await user.save();
    if (isRoom) {
      res.status(200).send({ status: "ok", msg: "room created." });
    } else {
      res.status(400).send({ status: "not ok", msg: "room not created." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "not ok", msg: "room not created." });
  }
};

const updateRoom = async (req, res) => {
  try {
    let update = req.body;
    let user = await userSchema.findOne({ username: req.user.username });

    // check if room exists for the user
    let found = false;
    for (let i = 0; i < user.rooms.length; i++) {
      let cmp = user.rooms[i].room_id.toString();
      if (cmp == req.params.id) {
        found = true;
      }
    }
    
    if (!found) {
      return res.status(400).send({ status: "not ok", msg: "room not found." });
    }

    for (let i = 0; i < user.devices.length; i++) {
      let cmp = user.devices[i].deviceId.toString();
      if (cmp == req.body.device_id) {
        user.devices[i].allocated = true;
      }
    }

    let updatedRoom = await roomSchema.findOneAndUpdate(
      { _id: req.params.id },
      update
    );

    if (updatedRoom) {
      await user.save();
      res.status(200).json(updatedRoom);
    } else {
      res.status(400).send({ status: "not ok", msg: "room not updated." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "not ok", msg: "room not updated." });
  }
};

const getRoom = async (req, res) => {
  try {
    let user = await userSchema.findOne({ username: req.user.username });
    if (user) {
      let rooms = await roomSchema.find({ user_id: user._id });
      res.status(200).send({ status: "ok", rooms });
    } else {
      res.status(400).send({ status: "not ok", msg: "rooms not found." });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).send({ status: "not ok", msg: "rooms not found." });
    }
  }
};

module.exports = { createRoom, getRoom, updateRoom };
