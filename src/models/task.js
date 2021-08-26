const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    /**Reference đến User tạo ra task */
    ref: "User",
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
