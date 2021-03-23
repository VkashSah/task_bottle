const express = require("express");
const router = express.Router();

const suscribeController = require("./../modules/subscribe/subscribeController");
const homeController = require("./../modules/home/homeController");
const validations = require("./../modules/subscribe/subscribeValidation");

/*TASK1 Email Subscription
------------------------------------------------------
*/
router.get("/", homeController.home); // To Home page

router.post(
  "/subscribe",
  validations.sanitize,
  validations.validateEmail,
  suscribeController.susbcribe
); // To Subscribe

router.get("/subscribe/:token", suscribeController.conformSusbcribe); //To Conform Subscribe

/*TASK2 Array Problem
-----------------------------------------------------------
*/

const task2Controller = require("./../modules/task2/task2Controller");

router.post("/task2", task2Controller.getIndices);

module.exports = router;
