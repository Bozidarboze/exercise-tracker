import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  log: [
    {
      description: String,
      duration: Number,
      date: String,
    },
  ],
});

const User = mongoose.model("User", UserSchema);

export default User;
