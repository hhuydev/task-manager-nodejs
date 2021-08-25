require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("6122638c80ad3e0514706edf")
//   .then((res) => {
//     return Task.countDocuments({ completed: false });
//   })
//   .then((count) => console.log(count))
//   .catch((err) => console.log(err));

const deleteTaskAndCount = async (id) => {
  const user = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("61236b5dbc699e11f48fe642", false)
  .then((count) => console.log(count))
  .catch((err) => console.log(err));
