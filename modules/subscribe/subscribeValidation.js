const { default: validator } = require("validator");
var MailChecker = require("mailchecker");

const validations = {};

validations.sanitize = (req, res, next) => {
  req.body.email = validator.trim(req.body.email);
  next();
};

validations.validateEmail = async (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    return res
      .status(400)
      .render("subscribe", { heading: "Please enter your Email" });
  }
  if (!validator.isEmail(email || "") || !MailChecker.isValid(email)) {
    return res.status(400).render("subscribe", {
      heading: "Invalid mail or Disposal mail detected!",
    });
  } else {
    next();
  }
};

module.exports = validations;
