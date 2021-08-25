const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

/**Config port nếu deploy server thì dùng port server || port localhost*/
const port = process.env.port || 3000;

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
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
