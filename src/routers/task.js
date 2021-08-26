const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);

  /**Chỉ ra user id mà tạo ra task */
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(err);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(err);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById({ _id });
    if (!task) res.status(404).send("Task not found!");
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(err);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(404).send({ error: "Invalid updates!" });

  try {
    const updateTask = await Task.findById(req.params.id);
    updates.forEach((update) => (updateTask[update] = req.body[update]));
    await updateTask.save();
    // const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!updateTask) return res.status(404).send({ error: "Task not found!" });
    res.status(200).send(updateTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) return res.status(404).send({ error: "Task not found!" });
    res.status(200).send(deleteTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
