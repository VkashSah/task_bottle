const mongoose = require("mongoose");
const schema = mongoose.Schema;

const subscribeSchema = new schema({
  email: { type: String, required: true },
  added_at: { type: Date },
});

module.exports = Subscribe = mongoose.model(
  "subscription_email",
  subscribeSchema
);
