import User from "../models/userModel.js";

const pushExercise = (req, res) => {
  const userId = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  let date = req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString();

  const exercise = {
    description,
    duration,
    date,
  };

  User.findByIdAndUpdate(userId, { $push: { log: exercise } }, { new: true }, (err, updatedUser) => {
    if (err) res.json("update error:", err);

    const response = {
      _id: userId,
      username: updatedUser.username,
      date: exercise.date,
      duration: Number(exercise.duration),
      description: exercise.description,
    };
    res.json(response);
  });
};

export default pushExercise;
