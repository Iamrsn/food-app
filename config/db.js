const mongoose = require("mongoose");
const colors = require("colors")
const connectDb= async ()=>{
   try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Db connected".bgYellow)
   } catch (error) {
    console.log("Error in Db",error.bgYellow)
   }
}

module.exports=connectDb