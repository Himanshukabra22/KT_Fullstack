const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const dbclient = require("./db/connection.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//Schemas
const adminSchema = require("./db/models/admin.js");

//Admin Routes
const adminRoutes = require("./routes/admin/adminAuth");
const adminUserRoutes = require("./routes/admin/user");
const deviceRoutes = require("./routes/admin/device");

//User Routes
const userAuth = require("./routes/user/userAuth");
const deviceRoutesFromUser = require("./routes/user/device");
const roomRoutesFromUser = require("./routes/user/room");

//Admin APIs
// app.use("/api/admin", adminRoutes);
// app.use("/api/agent",agent_responsequery);
// app.use("/api/agent",agent_resp_accessqueries);
// app.use("/api/agent",agent_noresp_accessqueries);
// app.use("/api/agent",agentAuth);

//Admin APIs
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminUserRoutes);
app.use("/api/admin/device", deviceRoutes);

//User APIs
app.use("/api/user", userAuth);
app.use("/api/user/device", deviceRoutesFromUser);
app.use("/api/user/room", roomRoutesFromUser);

app.get("/test", (req, res) => {
  res.send("Hello Wow--lrd!!");
});

app.post("/test", async (req, res) => {
  const created = await adminSchema.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  if (created) {
    res.status(200).send({ status: "ok", msg: "user created." });
  } else {
    res.status(400).send({ status: "not ok", msg: "user not created." });
  }
});

const serverStart = async () => {
  try {
    dbclient(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`http://localhost:${port}/test`);
    });
  } catch (error) {
    console.log(error);
  }
};

serverStart();
