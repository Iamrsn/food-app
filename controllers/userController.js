const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
//get user info

const getUsercontroller = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user Not found",
      });
    }
    //hide password
    //user.password=undefined;
    //response
    res.status(200).send({
      success: true,
      message: "user get succesfully",
      user,
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in get user api",
      error,
    });
  }
};

const updateUsercontroller = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user Not found",
      });
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).json({
      success: true,
      messsage: "user updated succesfully",
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in update user api",
      error,
    });
  }
};

const updatePasswordcontroller = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user Not found",
      });
    }
    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "please provide old or new password",
      });
    }
    //compare user password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid old password",
      });
    }
    user.password = newPassword;
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      success: true,
      messsage: "user password updated succesfully",
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in password update api",
      error,
    });
  }
};

const resetPassswordcontroller = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found or invalid answer",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "password reset succesfull",
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in password reset api",
      error,
    });
  }
};

//delete user
const deleteProfilecontroller = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "your account has been deleted",
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in delete user api",
      error,
    });
  }
};

module.exports = {
  getUsercontroller,
  updateUsercontroller,
  resetPassswordcontroller,
  updatePasswordcontroller,
  deleteProfilecontroller,
};
