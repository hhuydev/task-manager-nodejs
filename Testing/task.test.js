const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOne,
  userOneId,
  setUpDBTest,
  userTwo,
  taskOne,
} = require("./fixtures/dbTest");

/**Hàm này thực hiện trước các test case*/
beforeEach(setUpDBTest);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "Playing tennis",
    })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.description).toEqual("Playing tennis");
  expect(task.completed).toEqual(false);
});

test("Should get all test by userOne", async () => {
  const respone = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(respone.body.length).toEqual(2);
});

test("Should not delete other users tasks", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
