const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const massive = require("massive");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.SERVER_PORT || 3030;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  })
);

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log(`PostgreSQL Initialized`);
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MONGODB Initialized");
});

const uc = require("./controllers/userController");
const ec = require("./controllers/exerciseController");

//! User Endpoints
app.get("/api/users", uc.getUsers);
app.post("/api/users", uc.addUser);
app.delete('/api/users/:id', uc.deleteUser)
app.put('/api/users/:id', uc.editUser)

//! Exercise Endpoints
app.get('/api/exercises', ec.getExercises)
app.post('/api/exercises', ec.addExercise)
app.get('/api/exercises/:id', ec.getExercise)
app.delete('/api/exercise/:id', ec.deleteExercise)
app.put('/api/exercises/:id', ec.editExercise)

app.listen(port, () => {
  console.log("Server is running on", { port });
});
