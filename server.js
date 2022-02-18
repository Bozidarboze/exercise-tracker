import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import User from "./models/userModel.js";

import createUser from "./controllers/createUser.js";
import showUsers from "./controllers/showUsers.js";
import showUserLogs from "./controllers/showUserLogs.js";
import pushExercise from "./controllers/pushExercise.js";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/users", createUser);

app.get("/api/users", showUsers);

app.post("/api/users/:_id/exercises", pushExercise);

app.get("/api/users/:_id/logs", showUserLogs);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Your app is listening on port " + PORT);
});
