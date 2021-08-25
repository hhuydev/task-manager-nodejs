const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

/**User login */
router.post("/users/login", async (req, res) => {
  try {
    const userLogin = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await userLogin.generateAuthToken();
    res.status(200).send({ userLogin, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  /**Xóa đi token lưu trong server */
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => req.token !== token.token
    );

    /**Cập nhật lại thông tin req của user khi vừa xóa token user */
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  /**Xóa đi toàn bộ token lưu trong server */
  try {
    req.user.tokens = [];

    /**Cập nhật lại thông tin req của user khi vừa xóa token user */
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (error) {
  //   res.status(500).send();
  // }
});

router.get("/users/:id", async (req, res) => {
  /**Mongoose tu dong parse string sang new ObjectId()*/
  const _id = req.params.id;
  try {
    const user = await User.findById({ _id });
    if (!user) res.status(404).send("User not found!");
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/users/:id", async (req, res) => {
  /**Object.keys() -> return array  */
  const updates = Object.keys(req.body);
  const allowedUdpates = ["name", "age", "email", "password"];

  const isValidOperation = updates.every((update) =>
    allowedUdpates.includes(update)
  );
  if (!isValidOperation) res.status(404).send({ error: "Invalid updates!" });
  try {
    const updateUser = await User.findById(req.params.id);
    updates.forEach((update) => (updateUser[update] = req.body[update]));
    await updateUser.save();
    /**new: true -> trả về dối tượng mới update so vs đối tượng cũ
        runValidators: true -> đảm bảo dứ liệu update phải dc validate
       */
    // const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!updateUser) return res.send(404).send({ error: "Not found user!" });
    res.status(200).send(updateUser);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/users/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) return res.status(404).send({ error: "User not found!" });
    res.status(200).send(deleteUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
