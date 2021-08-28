const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "dang phuoc",
  email: "phuoc@gmail.com",
  password: "123456aa",
};

/**Hàm này thực hiện trước các test case*/
beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should create user and return status 201", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "huy",
      email: "huylatao211199@gmail.com",
      password: "123456aa",
    })
    .expect(201);
});

test("Should login existing user and return status 200", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
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
