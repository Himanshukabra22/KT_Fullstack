const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room_name: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
  device_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "device",
    default: null,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
