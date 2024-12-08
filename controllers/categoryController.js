const categoryModel = require("../models/categoryModel");

//cretate controller
const createCategorycontroller = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide title and imageurl please",
      });
    }
    const newcategory = new categoryModel({ title, imageUrl });
    await newcategory.save();
    res.status(201).send({
      success: true,
      message: "category created",
      newcategory,
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in create category api",
      error,
    });
  }
};

//get all category

const getAllCategorycontroller = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }
    res.status(200).send({
      success: true,
      totalCategories: categories.length,
      message: "categories found",
      categories,
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in create category api",
      error,
    });
  }
};

//update controller
const updateCategorycontroller = async (req, res) => {
  try {
    const catId = req.params.id;
    const { title, imageUrl } = req.body;
    const updateCategory = await categoryModel.findByIdAndUpdate(
      catId,
      { title, imageUrl },
      { new: true }
    );
    if (!updateCategory) {
      return res.status(500).send({
        success: false,
        message: "No category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "category updated succesfully",
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in create category api",
      error,
    });
  }
};

//delete category
const deleteCategorycontroller = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "please provide valid id",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "NO category found in this id",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "category deleted succesfully",
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in create category api",
      error,
    });
  }
};
module.exports = {
  createCategorycontroller,
  getAllCategorycontroller,
  updateCategorycontroller,
  deleteCategorycontroller,
};
