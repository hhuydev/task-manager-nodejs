const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

/**Config port nếu deploy server thì dùng port server || port localhost*/
const port = process.env.PORT;

/**Config express khi co request den thi data se parse json sang object*/
app.use(express.json());

/**Sử dụng middleware để check token user */
// app.use((req, res, next) => {
//   if (req.method === "GET") res.send("Get method is discrupted");
//   else if (req.method === "POST")
//     res.status(503).send("Server is under maintance");
//   else next();
// });

/**Gọi đến các route models*/
app.use(userRouter);
app.use(taskRouter);

// const bcrypt = require("bcrypt");
// const password = "123999!";
// const comparePassoword = async () => {
//   const hashedPassword = await bcrypt.hash(password, 8);
//   console.log(hashedPassword);
//   console.log(password);
//   const isMatchPassword = await bcrypt.compare(password, hashedPassword);
//   if (isMatchPassword) console.log("matched");
//   else console.log("unmatched");
// };
// comparePassoword();

// const jwt = require("jsonwebtoken");
// const myFucntion = async () => {
//   /** Tạo token yêu cầu 3 thông số: 1 là thông tin user, 2 là khóa bí mật, 3 là thời gian tồn tại*/
//   const token = jwt.sign({ _id: "123aa" }, "thisissecretkey", {
//     expiresIn: "1 hour",
//   });
//   console.log(token);
//   /**Verify thông tin user */
//   const data = jwt.verify(token, "thisissecretkey");
//   console.log(data);
// };

// myFucntion();

/**Test custom toJSON method to hide data */
// const myInfo = {
//   name: "ha gia huy",
//   age: 21,
//   email: "huy@gmail.com",
//   major: "student",
//   gender: "male",
// };

// myInfo.toJSON = function () {
//   console.log(this);
//   delete this.major;
//   delete this.male;
//   return { name: "gia huy", age: "21", email: "huy@gmail.com" };
// };

// console.log(JSON.stringify(myInfo));
// console.log(myInfo);
app.listen(port, () => {
  console.log("Server is running on port " + port);
});

// const Task = require("../src/models/task");
// const User = require("../src/models/user");

// const main = async () => {
//   // /**Tìm task theo id */
//   // const task = await Task.findById("61275fa08ae4bb3e045800be");
//   // /**Tìm toàn bộ thông tin user thông qua owner task */
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById("61275b8de61aa50d2c04d747");
//   // /**Tìm toàn bộ thông tin tasks của user */
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };
// main();

// const multer = require("multer");
// const upload = multer({
//   dest: "avatar",
//   limits: {
//     fileSize: 1000000,
//   },

//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
//       return cb(new Error("Just upload imgage file!"));
//     cb(undefined, true);
//   },
// });

// /**Custom middleware fucntion */
// const errorMiddleware = (req, res, next) => {
//   throw new Error("From my middleware!");
// };

// app.post(
//   "/upload",
//   errorMiddleware,
//   async (req, res) => {
//     res.send();
//   },
//   /**Xu ly custom middleware fucntion */
//   (err, req, res, next) => {
//     res.status(400).send({ error: err.message });
//   }
// );
