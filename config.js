const nodemailer = require("nodemailer");
const path = require("path");

const config = {
  db: {
    host: "imaginetventures.org",
    user: "imagin22_pennyUser",
    password: "$wnm_nG#jN{8",
    database: "imagin22_pennyWise",
    dateStrings: true,
  },
  statusCode: 200,

  returnData: {
    success: true,
    totalCount: 0,
    result: [],
    message: "Data Fetched",
    code: 0,
  },

  sp_Authentication: "CALL sp_Authentication(?, ?, ?, ?)",
  sp_budget_items: "CALL sp_budget_items(?, ?, ?, ?, ?)",
  sp_budget: "CALL sp_budget(?, ?, ?)",

  responseData: {
    code: "",
    message: "",
    data: "",
    count: "",
  },

  transporter: nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "imaginetventurestest123@gmail.com",
      pass: "brygofmanqvommjh",
    },
  }),
  handlebarOptions: {
    viewEngine: {
      partialsDir: path.resolve("./views/email"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/email"),
  },

  SecretKey: "pennywise",
};

module.exports = config;
