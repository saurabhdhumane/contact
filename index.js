const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");
const connectDB = require("./config/DBConnection.js");
const dotenv = require("dotenv").config();
connectDB()
const app = express();
const port = process.env.PORT || 5000
app.use(express.json())


app.use("/api/contacts/", require("./routes/ContactsRoute.js"))

app.use("/api/users/", require("./routes/userRoute.js"))
app.use(errorHandler)

app.listen(port, ()=>{
    console.log("server runing on port: "+ port);
})