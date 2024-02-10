const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = require("../db/models/user.js");

const userLoginCheck = async (req, res, next) => {
  try {
    if (req.headers.authorization) {

      const token = req.headers.authorization;

      const user = jwt.verify(token, process.env.JWT_USER_SECRET_KEY);

      console.log(user);

      const {_id} = user;

      ObjectId = require('mongodb').ObjectId;
      let  o_id = new ObjectId(_id);

      const userLoggedInData = await userSchema.findOne({"_id" : o_id});

      if (!userLoggedInData) {
        return res.status(400).send({ status: "not ok", msg: "No such user exists" });
      }

      const { username } = userLoggedInData;
      req.user = { username , type: "user" };
      console.log(req.user);
    }
    else{
        return res.status(400).send({status : "not ok", msg : "user not logged in."})
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({status : "not ok", msg : "authentication fail."})
  }
  next();
};

module.exports = {userLoginCheck};
