require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Schemas
const adminSchema = require("../../db/models/admin.js");

const Login = async (req, res) => {
  try {
    const {username, password} = req.body;
    let isExist = await adminSchema.findOne({username});

    if (!isExist) {
      return res.status(400).send({ status: "not ok", msg: "admin not found" });
    }

    const match = bcrypt.compareSync(password,isExist.password);
    if(match){
        const {_id} = isExist;
        const token = jwt.sign({ _id, username }, process.env.JWT_ADMIN_SECRET_KEY);
        return res.status(200).send({ status: "ok", token });
    }
    else{
        return res.status(400).send({ status: "not ok" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Register = async (req, res) => {
  try {
    const {name, username, password : plainTextPassword, email} = req.body;
    const isExist = await adminSchema.findOne({username});
    if(isExist){
      return res.status(400).send({ status: "not ok", msg: "admin already exist" });
    }
    else{

        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(String(plainTextPassword), salt);

        const created = await adminSchema.create({
            name: name,
            username: username,
            email: email,
            password: password,
        });

        if(created){
            return res.status(200).send({status : "ok", msg : "admin created."});
        }
        else{
            return res.status(400).send({status : "not ok", msg : "admin not created."});
        }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Register, Login };
