const mongoose = require("mongoose");

mongoose.connect(process.env.DB_TASK_APP, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
