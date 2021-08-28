const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8;
const celsiusToFahrenheit = (temp) => temp * 1.8 + 32;
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (b < 0 && b < 0) reject("a,b must greater than 0");
      else resolve(a + b);
    }, 1000);
  });
};

module.exports = { fahrenheitToCelsius, celsiusToFahrenheit, add };
