import User from "../models/userModel.js";

const showUsers = (req, res) => {
  User.find((err, users) => {
    if (err) res.json("Server Error");

    const usersArray = users.map((user) => ({ _id: user._id, username: user.username }));
    res.json(usersArray);
  });
};

export default showUsers;
