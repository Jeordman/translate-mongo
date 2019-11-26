const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = {
  getExercises: (req, res) => {
    Exercise.find()
      .then(exercises => res.json(exercises))
      .catch(err => res.status(500).json("Error: " + err));
  },
  addExercise: (req, res) => {
    const { username, description } = req.body;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({ username, description, duration, date });

    newExercise
      .save()
      .then(() => res.json("Exercise added!"))
      .catch(err => res.status(500).json("Error: " + err));
  },
  getExercise: (req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json("Error: " + err));
  },
  deleteExercise: (req, res) => {
    Exercise.findById(req.params.id).then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    });
  },
  editExercise: (req, res) => {
    Exercise.findById(req.params.id)
      .remove()
      .then(() => res.json("Deleted!"))
      .catch(err => res.status(400).json("Error: " + err));
  }
};
