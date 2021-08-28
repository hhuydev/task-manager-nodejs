const {
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../src/math");

/**expect().tobe(): kỳ vọng giá trị mong muốn test  */
test("Should convert 32F to 0C ", () => {
  const test1 = fahrenheitToCelsius(32);
  expect(test1).toBe(0);
});

test("Should convert 0C to 32F ", () => {
  const test2 = celsiusToFahrenheit(0);
  expect(test2).toBe(32);
});

test("Test Async add function using callback", (cb) => {
  const test3 = add(7, 8).then((sum) => {
    expect(sum).toBe(15);
    cb();
  });
});

test("Test Async add function using Async/Await", async () => {
  const test3 = await add(10, 2);
  expect(test3).toBe(12);
});
