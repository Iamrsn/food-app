const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategorycontroller,
  getAllCategorycontroller,
  updateCategorycontroller,
  deleteCategorycontroller,
} = require("../controllers/categoryController");
const router = express.Router();

//routes
//create category
router.post("/create", authMiddleware, createCategorycontroller);

//get all
router.get("/getAll", getAllCategorycontroller);

//update category
router.put("/update/:id", authMiddleware, updateCategorycontroller);

//delete category
router.delete("/delete/:id", authMiddleware, deleteCategorycontroller);
module.exports = router;
