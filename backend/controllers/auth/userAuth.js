require("dotenv").config();
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

//Schemas
const userSchema = require("../../db/models/user.js");

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let isExist = await userSchema.findOne({ username });

    if (!isExist)
      return res.status(400).send({ status: "not ok", msg: "user not found" });

    if (password == isExist.password) {
      const { _id } = isExist;
      const token = jwt.sign(
        { _id, username },
        process.env.JWT_USER_SECRET_KEY
      );
      return res.status(200).send({ status: "ok", token });
    } else {
      return res.status(400).send({ status: "not ok" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isExist = await userSchema.findOne({ username });
    if (isExist) {
      return res
        .status(400)
        .send({ status: "not ok", msg: "user already exist" });
    } else {
      // const salt = bcrypt.genSaltSync(10);
      // const password = bcrypt.hashSync(String(plainTextPassword), salt);

      const created = await userSchema.create({
        username: username,
        password: password,
      });

      if (created) {
        return res.status(200).send({ status: "ok", msg: "user created." });
      } else {
        return res
          .status(400)
          .send({ status: "not ok", msg: "user not created." });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Register, Login };
