require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("61226b95c7217c31302ad315", { age: 23 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 22 });
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

const findAndUpdateAgeUser = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

findAndUpdateAgeUser("612365deacb1302754531b9d", 22)
  .then((count) => console.log(count))
  .catch((err) => console.log(err));
