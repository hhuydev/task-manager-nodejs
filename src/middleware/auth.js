const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    /**Thêm {authoriazation: Bearer ...} bên postman */
    const token = req.header("Authorization").replace("Bearer ", "");
    /**Decode token dể lấy thông tin validate */
    const decoded = jwt.verify(token, "thisissecretkey");
    /**Tìm user thông qua token decoded*/
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) res.status(404).send({ error: "User is invalid!" });
    // console.log(req.user);

    /**Lưu thông tin user lại req và gửi lại route*/
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate!" });
  }
};
module.exports = auth;
