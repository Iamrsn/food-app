const foodModal = require("../models/foodModel");
const orderModel = require("../models/orderModel")
//create foodcontroler
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const newFood = new foodModal({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};

//get all foods

const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModal.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food items was found",
      });
    }
    res.status(200).send({
      success: true,
      totalfoods: foods.length,
      message: "Food Items found",
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAll food api",
      error,
    });
  }
};
//get by id
const getFoodByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "please provide valid id",
      });
    }
    const foodbyId = await foodModal.findById(id);
    if (!foodbyId) {
      return res.status(404).send({
        success: false,
        message: "no food with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food found",
      foodbyId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAll food api",
      error,
    });
  }
};

//get foodby resturant
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide valid id",
      });
    }
    const foodbyId = await foodModal.find({ restaurant: resturantId });
    if (!foodbyId) {
      return res.status(404).send({
        success: false,
        message: "no food with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on resturant",
      foodbyId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAll food api",
      error,
    });
  }
};

//update food
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "no food found please provide valid id",
      });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    } = req.body;
    const updatedFood = await foodModal.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        restaurant,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "food updated",
      updatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update food api",
      error,
    });
  }
};

//delete food
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "no food found please provide valid id",
      });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found",
      });
    }
    await foodModal.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete food api",
      error,
    });
  }
};
//place order 
const placeOrderController = async (req,res)=>{
  try {
    const {cart,payment} = req.body;
    if(!cart){
      return res.status(500).send({
        success:false,
        message:"please add card or payment method"
      })
    }
    let total =0;
    //calculate 
    cart.map((i)=>{
      total+=i.price
    })
    const neworder = new orderModel({
      foods:cart,
      payment:total,
      buyer:req.body.id
    })
    await neworder.save();
    res.status(201).send({
      success:true,
      message:"order placed succesfully",
      neworder
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in place order api",
      error,
    });
  }
}

//change order status
const orderStatuscontroller = async (req,res)=>{
  try {
    const OrderId=req.params.id
    if(!OrderId){
      return res.status(404).send({
        success:false,
        message:"please provide valid order id"
      })
    }
    const {status} = req.body;
    const order = await orderModel.findByIdAndUpdate(OrderId,{status},{new:true})
    res.status(200).send({
      success:true,
      message:"order status updated"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in place order api",
      error,
    });
  }
}
module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatuscontroller
};
