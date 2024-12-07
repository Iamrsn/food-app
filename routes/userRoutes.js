const express = require("express");
const {
  getUsercontroller,
  updateUsercontroller,
  resetPassswordcontroller,
  updatePasswordcontroller,
  deleteProfilecontroller,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//get user data//get
router.get("/getUser", authMiddleware, getUsercontroller);

//update put
router.put("/updateUser", authMiddleware, updateUsercontroller);

//password update
router.post("/updatePassword", authMiddleware, updatePasswordcontroller);

//reset password
router.post("/resetpassword", authMiddleware, resetPassswordcontroller);

//delete user
router.delete("/deleteUser/:id", authMiddleware, deleteProfilecontroller);

module.exports = router;
