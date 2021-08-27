const express = require("express");
const Task = require("../models/task");
const User = require("../models/user");
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

// Vd: localhost:3000/tasks?completed=true
// Vd: localhost:3000/tasks?limit=10
// Vd: localhost:3000/sortBy=createdBy:desc
router.get("/tasks", auth, async (req, res) => {
  try {
    /**Cach 1 get task theo user id */
    // const tasks = await Task.find({
    //   owner: req.user._id,
    // });
    // res.status(200).send(tasks);

    /**Cach 2 get task theo user id */
    /**Thêm query tasks có điều kiện completed*/
    const match = {};
    /**Thêm query sort có điều kiện createdBy*/
    const sort = {};
    /**Kiểm tra trên url query có completed không - nếu không nghĩa là lấy hết*/
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }
    /**Kiểm tra trên url query có sortBy không - nếu không nghĩa là lấy hết*/
    if (req.query.sortBy) {
      const part = req.query.sortBy.split(":");
      /**Kiểm tra nếu đúng sort tăng dần và ngược lại */
      sort[part[0]] = part[1] === "asc" ? 1 : -1;
    }
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (error) {
    res.status(500).send(err);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await Task.findById({ _id });
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) res.status(404).send("Task not found!");
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(err);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(404).send({ error: "Invalid updates!" });

  try {
    /**Cách 1: tìm theo id task */
    // const updateTask = await Task.findById(req.params.id);

    /**Cách 2: tìm theo id task & id user*/
    const updateTask = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    /**new : tra ve task moi, runValidator: validate data moi */
    // const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!updateTask) return res.status(404).send({ error: "Task not found!" });
    updates.forEach((update) => (updateTask[update] = req.body[update]));
    await updateTask.save();

    res.status(200).send(updateTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const deleteTask = await Task.findByIdAndDelete(req.params.id);
    const deleteTask = await Task.findByIdAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!deleteTask) return res.status(404).send({ error: "Task not found!" });
    res.status(200).send(deleteTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
