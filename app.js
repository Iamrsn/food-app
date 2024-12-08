const express = require("express");
const colors =require("colors")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()


//rest object
const app = express();
const connectDb=require("./config/db");
connectDb()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//const testRoutes = require("./routes/testRoutes")
app.use("/api/v1/test",require("./routes/testRoutes"))
app.use("/api/v1/auth",require("./routes/authRoutes"))
app.use("/api/v1/user",require("./routes/userRoutes"))
app.use("/api/v1/resturant",require("./routes/resturantRoutes"))
app.use("/api/v1/category",require("./routes/categoryRoutes"))
//route
app.get("/", (req, res) => {
  res.send("<h1>hlloooo bhaiii</h1>");
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`.white.bgMagenta);
});
