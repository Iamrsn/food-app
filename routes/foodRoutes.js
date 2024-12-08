const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatuscontroller
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = express.Router();

//routes
//create food
router.post("/create", authMiddleware, createFoodController);

//get all foods
router.get("/getAll", getAllFoodController);

//get foodbyid foods
router.get("/get/:id", authMiddleware, getFoodByIdController);

//get foodby resturant
router.get("/getByResturant/:id", authMiddleware, getFoodByResturantController);

//update  foods
router.put("/update/:id", authMiddleware, updateFoodController);

//delete  foods
router.delete("/delete/:id", authMiddleware, deleteFoodController);

//place  order
router.post("/placeOrder", authMiddleware, placeOrderController);

//order status
router.post("/orderStatus/:id",authMiddleware,adminMiddleware,orderStatuscontroller) //admin bss order ki status ko change kar sakta hai
module.exports = router;
