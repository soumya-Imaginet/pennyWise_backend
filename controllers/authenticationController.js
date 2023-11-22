const authenticationModel = require("../models/authenticationModel");

exports.signUp = async function (req, res) {
  return await authenticationModel.signUp(req, res);
};

exports.logIn = async function (req, res) {
  return await authenticationModel.logIn(req, res);
};

exports.forgotPass = async function (req, res) {
  return await authenticationModel.forgotPass(req, res);
};