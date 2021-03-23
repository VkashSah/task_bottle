const homeController = {};

homeController.home = (req, res) => {
  try {
    res.status(200).render("home", {
      heading: "Please Enter your Email & hit Subscribe to Subscribe.",
      success: true,
    });
  } catch (err) {
    res.status(500).render("home", {
      heading: err.message,
      success: false,
    });
  }
};

module.exports = homeController;
