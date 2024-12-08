const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createResturantcontroller ,getAllResturantcontroller,getResturantByIDcontroller,deleteResturantcontroller} = require("../controllers/resturantController");
const router = express.Router();

//routes
//create resturant
router.post("/create",authMiddleware,createResturantcontroller)

//get all resturant
router.get("/getAll",authMiddleware,getAllResturantcontroller)

//get id by resturant
router.get("/get/:id",getResturantByIDcontroller)

//delete resturant
router.delete("/delete/:id",deleteResturantcontroller)


module.exports = router;
