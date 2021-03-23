const sgMail = require("@sendgrid/mail");

const sendMail = {};
const sendGridKey =
  process.env.SENDGRID_API_KEY ||
  "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";

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
