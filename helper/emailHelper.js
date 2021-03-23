const sgMail = require("@sendgrid/mail");

const sendMail = {};
const sendGridKey = process.env.SENDGRID_API_KEY || "sendgrid key";

sendMail.send = async (msg) => {
  sgMail.setApiKey(sendGridKey);
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = sendMail;
