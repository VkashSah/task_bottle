const task2Controller = {};

task2Controller.getIndices = (req, res) => {
  let { nums, target } = req.body;
  try {
    for (var i = 0; i < nums.length; i++) {
      let diff = target - nums[i];
      if (nums.indexOf(diff) !== -1) {
        return res.status(200).json([i, nums.indexOf(diff)]);
      }
    }
    return res
      .status(400)
      .json({ message: "Data not Found!!!", success: false });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = task2Controller;
