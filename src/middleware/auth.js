const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    /**Thêm {authoriazation: Bearer ...} bên postman */
    const token = req.header("Authorization").replace("Bearer ", "");
    /**Decode token dể lấy thông tin validate */
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    /**Tìm user thông qua token decoded*/
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    // console.log(req.user);

    /**Lưu thông tin user lại req và gửi lại route*/
    req.user = user;
    /**Lưu thông tin token lại req và gửi lại route*/
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate!" });
  }
};
module.exports = auth;
