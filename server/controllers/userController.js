const mongoose = require("mongoose");
//! Grabbing a schema class from mongoose
const Schema = mongoose.Schema;

console.log(Schema);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, //whitespace will be deleted
      minlength: 3
    }
  },
  {
    timestamps: true //create fields for creation/modification
  }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  getUsers: (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(500).json("Error: " + err));
  },

  addUser: (req, res) => {
    const { username } = req.body;

    const newUser = new User({ username });

    newUser
      .save()
      .then(() => res.send("User Added!"))
      .catch(err => res.status(500).send("Error: " + err));
  },

  deleteUser: (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id)
      .then(() => res.send("User Deleted!"))
      .catch(err => res.status(500).send("Error: " + err));
  },

  editUser: (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    console.log(User.findByIdAndUpdate);
    User.findByIdAndUpdate(id, { username })
      .then(() => res.send("User Updated!"))
      .catch(err => res.status(500).send("Error: " + err));
  }
};
