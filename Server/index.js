const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test");

app.get("/get", (req, res) => {
  TodoModel.find()
    // result = вся модель TodoModel
    .then((result) => res.json(result)) // передаем (TodoModel.find()) браузеру
    // в формате:
    // {
    //     task: String,
    //     checked: Boolean
    // }
    .catch((err) => res.json(err)); // в случае ошибки передаем браузеру ошибку в формате
  // {error: ....}
});
app.post("/add", (req, res) => {
  const task = req.body.task;

  TodoModel.create({ task: task, checked: false })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.post("/delete", (req, res) => {
  const taskId = req.body.taskId;
  TodoModel.deleteOne({ _id: taskId })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/check", async (req, res) => {
  try {
    const task = req.body.task;
    console.log(req.body);
    const todo = await TodoModel.findOne({ _id: task });

    todo.checked = req.body.isChecked;

    await todo.save();

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(3001, () => {
  console.log("Server is Running");
});
