const config = require("../config");
const db = require("../services/db");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  genHashedPass,
  generateRandomPin,
} = require("../services/genFunctions");

async function budget(req, res) {
  try {
    console.log("budget");
    let formData = [];

    //signUp the user
    formData.push(req.body.intUserId);
    formData.push(req.body.txtBudget || "");
    formData.push(req.body.intType || 1);

    console.log("formData", formData);

    //Authenticate the username and password.
    const result = await db.query(config.sp_budget, formData);

    console.log("result", result);

    if (
      result[0][0].returnMessage == "Budget Added Successfully" ||
      result[0][0].returnMessage == "Budget Updated Successfully" ||
      result[0][0].returnMessage == "Budget fetched Successfully"
    ) {
      config.statusCode = 200;
      config.returnData.message = result[0][0].returnMessage;
      config.returnData.result = result[1];
    } else {
      config.statusCode = 500;
      config.returnData.message = result[0][0].returnMessage;
    }
  } catch (error) {
    config.statusCode = 500;
    config.returnData.result = [];
    config.returnData.message = "Something went wrong";
  }

  return res.status(config.statusCode).json(config.returnData);
}

async function items(req, res) {
  try {
    console.log("budget-items");
    let formData = [];

    //signUp the user
    formData.push(req.body.intUserId || 0);
    formData.push(req.body.txtValue || "");
    formData.push(req.body.txtAmount || "");
    formData.push(req.body.txtCategory || "");
    formData.push(req.body.intType || 1);

    console.log("formData", formData);

    //Authenticate the username and password.
    const result = await db.query(config.sp_budget_items, formData);

    console.log("result", result);

    if (
      result[0][0].returnMessage == "items Added Successfully" ||
      result[0][0].returnMessage == "items fetched Successfully"
    ) {
      config.statusCode = 200;
      config.returnData.message = result[0][0].returnMessage;
      config.returnData.result = result[1];
    } else {
      config.statusCode = 500;
      config.returnData.message = result[0][0].returnMessage;
    }
  } catch (error) {
    config.statusCode = 500;
    config.returnData.result = [];
    config.returnData.message = "Something went wrong";
  }

  return res.status(config.statusCode).json(config.returnData);
}

module.exports = { budget, items };
