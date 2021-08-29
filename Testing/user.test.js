const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const jwt = require("jsonwebtoken");
const User = require("../src/models/user");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "dang phuoc",
  email: "phuoc@gmail.com",
  password: "123456aa",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET_KEY),
    },
  ],
};

/**Hàm này thực hiện trước các test case*/
beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should create user and return status 201", async () => {
  const respone = await request(app)
    .post("/users")
    .send({
      name: "huy",
      email: "huylatao211199@gmail.com",
      password: "123456aa",
    })
    .expect(201);
  /**Tìm thấy user vừa đăng ký trong db */
  const user = await User.findById(respone.body.user._id);
  expect(user).not.toBeNull();
  /**Đảm bảo password dc mã hóa khi dc lưu trong db*/
  expect(user.password).not.toBe("123456aa");
});

test("Should login existing user and return status 200", async () => {
  const respone = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findOne({ email: userOne.email });
  expect(user).not.toBeNull();
  /**So token mới nhất vừa login vs token của user lưu trong db */
  expect(respone.body.token).toBe(user.tokens[1].token);
});

test("Should not login unexisting user and return status 400", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "abc@gmail.com",
      password: "123456aa",
    })
    .expect(400);
});

test("Should get profile by Authenticated user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for Unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete user by Authenticated user", async () => {
  const respone = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user).toBeNull();
});

test("Should not delete user by Unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload user img", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "Testing/fixtures/profile-pic.jpg")
    .expect(200);
  const user = await User.findById(userOne._id);
  /**So sánh reference type trong jest */
  // expect({}).toEqual({});

  /**So sánh gần đùng kiểu dữ liệu avatar dc lưu dưới dạng nhị phân */
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "huy" })
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user.name).toEqual("huy");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "vn" })
    .expect(404);
});
