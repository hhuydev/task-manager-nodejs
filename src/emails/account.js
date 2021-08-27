const sgMail = require("@sendgrid/mail");
const sendGridAPIKey =
  "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";
sgMail.setApiKey(sendGridAPIKey);

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
module.e;
module.exports = { sendWelcomeEmail, sendCancleEmail };
