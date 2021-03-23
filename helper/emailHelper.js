const sgMail = require("@sendgrid/mail");

const sendMail = {};
const sendGridKey = process.env.SENDGRID_API_KEY || "sendgrid key";

sendMail.send = async (msg) => {
  sgMail.setApiKey(sendGridKey);
  try {
    await sgMail.send(msg);
    console.log(
      msg,
      "Please click on link of console HTML link for Email Conformation & Url redirect to Google. Incase you've not generated SendGrid key"
    );
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = sendMail;
