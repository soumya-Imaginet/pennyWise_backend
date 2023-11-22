var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const db = require("./services/db");
const cors = require("cors");
require("dotenv/config");



const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authenticationRouter = require('./routes/auth/auth');
const dashbordRouter = require("./routes/dashboard/dashboard");


// Routers
app.use("/api/auth", authenticationRouter);
app.use('/api/dashboard', dashbordRouter)


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

module.exports = app;