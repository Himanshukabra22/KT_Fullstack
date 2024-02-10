const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = require("../../db/models/user.js");

const getUser = async (req, res) => {
  try {
    let user = await userSchema.find();
    if (user) {
      res.status(200).send({ status: "ok", user });
    } else {
      res.status(400).send({ status: "not ok", msg: "users not found." });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).send({ status: "not ok", msg: "users not found." });
    }
  }
};

module.exports = { getUser };