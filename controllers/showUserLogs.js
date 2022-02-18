import User from "../models/userModel.js";

const showUserLogs = (req, res) => {
  const userId = req.params._id;
  const from = req.query.from;
  const to = req.query.to;
  const limit = req.query.limit;

  User.findById(userId, (err, user) => {
    if (err) res.json(err);

    let log = user.log.map((exercise) => {
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString(),
      };
    });
    if (from) {
      const fromDate = new Date(from);
      log = log.filter((exercise) => new Date(exercise.date) >= fromDate);
    }
    if (to) {
      const toDate = new Date(to);
      log = log.filter((exercise) => new Date(exercise.date) <= toDate);
    }
    if (limit) {
      log = log.slice(0, limit);
    }

    const count = log.length;

    res.send({
      _id: userId,
      username: user.username,
      count: count,
      log,
    });
  });
};

export default showUserLogs;
