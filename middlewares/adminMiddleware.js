const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "only admin acess",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "UN-Authorized Acess",
      error,
    });
  }
};
