const ResturantModel = require("../models/resturantModel");
//create controller fn
const createResturantcontroller = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newRest = new ResturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRest.save();
    res.status(201).send({
      success: true,
      message: "New resturant created succesfully",
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in create resturant api",
      error,
    });
  }
};

const getAllResturantcontroller = async (req, res) => {
  try {
    const restaurants = await ResturantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No resturant available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in get all resturant api",
      error,
    });
  }
};

const getResturantByIDcontroller = async (req, res) => {
  try {
    const restId = req.params.id;
    if (!restId) {
      return res.status(404).send({
        success: false,
        message: "please provide valid resturant id",
      });
    }
    //find rest
    const resturant = await ResturantModel.findById(restId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "NO resturant found",
      });
    }
    res.status(200).send({
      success: true,
      message: "resturant details",
      resturant,
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in get all resturant api",
      error,
    });
  }
};
//delete resturant

const deleteResturantcontroller = async (req,res)=>{
  try {
    const restId = req.params.id;
    if (!restId) {
      return res.status(404).send({
        success: false,
        message: "please provide valid resturant id",
      });
    }
    await ResturantModel.findByIdAndDelete(restId)
    res.status(200).send({
      success: true,
      message: "resturant deleted succesfully"
    });
  } catch (error) {
    console.log("Error is", error);
    res.status(500).send({
      success: false,
      message: "Error in delete resturant api",
      error,
    });
  }
}
module.exports = {
  createResturantcontroller,
  getAllResturantcontroller,
  getResturantByIDcontroller,
  deleteResturantcontroller
};
