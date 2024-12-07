const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//register
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    //validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    //check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "email already regsiter please login",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    //create new user

    const user = await userModel.create({
      userName,
      email,
      password:hashedPassword,
      phone,
      address,
      answer
    });
    res.status(201).send({
      success: true,
      message: "succesfully registered",
      user,
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in register api",
      error,
    });
  }
};

//login

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "please provide email or passsword",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //user password compare
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(500).send({
            success:false,
            message:"invalid credentials"
        })
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
   //user.password=undefined;  ye use krege to password ka field ni dikhayegaa
    res.status(200).send({
      success: true,
      message: "succesfully login",
      token,
      user,
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in login api",
      error,
    });
  }
};
module.exports = { registerController, loginController };
