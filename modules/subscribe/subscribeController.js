const subscribeSchema = require("./subscribeSchema");
const jwt = require("jsonwebtoken");
const jwt_key = process.env.jwt_key || "jwt_key";
const subscribeController = {};
const mailHelper = require("../../helper/emailHelper");
const baseUrl = process.env.baseUrl || "http://localhost:5000/subscribe";
const senderEmail = process.env.email || "mevkashsah@gmail.com";

subscribeController.susbcribe = async (req, res) => {
  let email = req.body.email;
  try {
    const checkAlready = await subscribeSchema.findOne({
      email: email,
    });
    if (checkAlready) {
      res
        .status(409)
        .render("subscribe", { heading: "You're already our member!" });
    } else {
      const token = await jwt.sign({ email }, jwt_key, {
        expiresIn: "1d",
      });

      await mailHelper.send({
        to: email,
        from: senderEmail, // Use the email address or domain you verified above
        subject: "Bottle Test Subs Conformation Link",
        text: "Click on link to conform your Subscription",
        html: `<a href='${baseUrl}/${token}'>Click Here</a>`,
      });
      return res
        .status(200)
        .render("subscribe", { heading: "Please check your Email Inbox" });
    }
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server error!" });
  }
};

subscribeController.conformSusbcribe = async (req, res) => {
  let token = req.params.token;
  try {
    if (token) {
      jwt.verify(token, jwt_key, async (err, decodedToken) => {
        if (err) {
          return res
            .status(400)
            .render("subscribe", { heading: "Invalid or Expired link." });
        }
        const { email } = decodedToken;
        const checkAlready = await subscribeSchema.findOne({
          email: email,
        });
        if (checkAlready) {
          await mailHelper.send({
            to: email,
            from: senderEmail, // Use the email address or domain you verified above
            subject: "Bottle Test -You're already our member!",
            text: "You're already our member!",
            html: `<h1>You're already our member! </h1>`,
          });
          return res
            .status(409)
            .render("subscribe", { heading: "You're already our member!" });
        } else {
          const new_subscriber = new subscribeSchema({
            email: email,
            added_at: Date.now(),
          });
          const subs = await new_subscriber.save();
          return res.status(200).redirect("http://google.com");
        }
      });
    }
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server error!" });
  }
};

module.exports = subscribeController;
