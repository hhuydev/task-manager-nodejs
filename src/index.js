const app = require("./app");
/**Config port nếu deploy server thì dùng port server || port localhost*/
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
