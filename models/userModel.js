const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"UserName is Required"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,"phone number is Required"],
    },
    usertype:{
        type:String,
        required:[true,"user type is Required"],
        default:"client",
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:"https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{timestamps:true})


module.exports=mongoose.model("user",userSchema)