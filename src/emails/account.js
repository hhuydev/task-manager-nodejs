const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "gmannvm1@gmail.com",
    subject: "Testing send mail by SendGrid",
    text: `Welcome ${name} to my Task App, please tell me if you need help`,
  });
};

const sendCancleEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "gmannvm1@gmail.com",
    subject: "Testing send mail by SendGrid",
    text: `Thanks ${name}, see you!`,
  });
};
module.exports = { sendWelcomeEmail, sendCancleEmail };
