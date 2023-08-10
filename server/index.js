const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({credentials: true, origin: '*'}));


app.listen(4000, () => {
    console.log("Server Stated on PORT 4000");
});

mongoose.connect("mongodb://127.0.0.1:27017/jwt", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("DB Connection Successfull");
}).catch((err) => {
    console.log(err.message);
})


app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
