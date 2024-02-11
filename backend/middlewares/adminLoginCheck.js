const jwt = require("jsonwebtoken");
require("dotenv").config();

// Schemas
const adminSchema = require("../db/models/admin.js");

const adminLoginCheck = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      const admin = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY);

      if (!admin)
        return res
          .status(400)
          .send({ status: "not ok", msg: "No such admin exists" });

      const { _id } = admin;
      ObjectId = require("mongodb").ObjectId;
      let o_id = new ObjectId(_id);
      const adminLoggedInData = await adminSchema.findOne({ _id: o_id });

      if (!adminLoggedInData)
        return res
          .status(400)
          .send({ status: "not ok", msg: "No such admin exists" });

      const { username, email } = adminLoggedInData;
      req.user = { username, email, type: "admin" };
      console.log(req.user);
    } else
      return res
        .status(400)
        .send({ status: "not ok", msg: "admin not logged in." });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .send({ status: "not ok", msg: "authentication fail." });
  }
  next();
};

module.exports = { adminLoginCheck };
