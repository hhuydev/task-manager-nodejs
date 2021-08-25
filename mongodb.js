// CRUD

const { MongoClient, ObjectId } = require("mongodb");

const id = new ObjectId();
console.log(id);
console.log(id.getTimestamp());

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.error("Failed to connect mongoDB");

  /**Tao db trong mongodb */
  const db = client.db(dbName);

  /**delete value cua nhieu user */
  // db.collection("users")
  //   .deleteMany({ name: "Huy" })
  //   .then((rs) => console.log(rs))
  //   .catch((err) => console.log(err));

  /**delete value cua mot course */
  db.collection("tracker-courses")
    .deleteOne({
      _id: new ObjectId("6121ff13557c15e80f9befc2"),
    })
    .then((rs) => console.log(rs))
    .catch((err) => console.log(err));

  /**update value cua 1 user */
  //   db.collection("users")
  //     .updateOne(
  //       { _id: new ObjectId("61220d8b9b90d0e8caba7fde") },
  //       {
  //         $set: {
  //           name: "Thanh",
  //         },
  //         $inc: {
  //           age: 8,
  //         },
  //       }
  //     )
  //     .then((rs) => {
  //       console.log(rs);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  /**update value cua nhieu cousrse */
  // db.collection("tracker-courses")
  //   .updateMany(
  //     { completed: false },
  //     {
  //       $set: {
  //         completed: true,
  //       },
  //     }
  //   )
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  /**Nếu cần tìm theo id thì phải để trong new ObjectId() do các id trong mongo dạng nhị phân
   * nếu so sáng chuỗi bình thường thì sẽ lỗi*/
  //   db.collection("users").findOne(
  //     { _id: new ObjectId("61220d8b9b90d0e8caba7fde") },
  //     (err, user) => {
  //       if (err) return console.log(err);
  //       console.log(user);
  //     }
  //   );

  /**find trả về con trỏ giúp xử lý dc nhiều hơn nhờ các api cung cấp cho con trỏ*/
  //   db.collection("users")
  //     .find({ name: "Huy" })
  //     .toArray((err, arr) => {
  //       if (err) return console.log(err);
  //       console.log(arr);
  //     });

  //   db.collection("tracker-courses").findOne(
  //     { _id: new ObjectId("6121ff13557c15e80f9befc2") },
  //     (err, course) => {
  //       if (err) return console.log(err);
  //       console.log(course);
  //     }
  //   );

  //   db.collection("tracker-courses")
  //     .find({ completed: false })
  //     .toArray((err, courses) => {
  //       if (err) return console.log(err);
  //       console.log(courses);
  //     });

  /**Them 1 field vao trong collection user */
  //   db.collection("users").insertOne({
  //     _id: id,
  //     name: "Huy",
  //     age: 22,
  //   });

  /**Them nhieu field vao trong collection user */
  //   db.collection("users").insertMany(
  //     [
  //       {
  //         name: "An",
  //         age: 18,
  //       },
  //       {
  //         name: "Ngoc",
  //         age: 25,
  //       },
  //     ],
  //     (err, result) => {
  //       if (err) return console.log("Unable to insert documents: " + err);
  //       console.log(result);
  //     }
  //   );

  //   db.collection("tracker-courses").insertMany(
  //     [
  //       {
  //         description: "Reactjs Udemy course",
  //         completed: true,
  //       },
  //       {
  //         description: "Nodejs Udemy course",
  //         completed: false,
  //       },
  //       {
  //         description: "Fullstack Udemy course",
  //         completed: false,
  //       },
  //     ],
  //     (err, rs) => {
  //       if (err) return console.log(err);
  //       console.log(rs);
  //     }
  //   );
});
