import User from "../models/userModel.js";

const createUser = (req, res) => {
  const username = req.body.username;

  User.findOne({ username }, (err, user) => {
    if (err) res.json(err);

    if (user) {
      res.json({
        username,
        _id: user._id,
      });
    } else {
      const user = new User({
        username,
      });
      user.save((err, user) => {
        if (err) res.json(err);

        res.json({
          username,
          _id: user._id,
        });
      });
    }
  });
};

export default createUser;
