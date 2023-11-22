const dashboardModel = require("../models/dashboardModel");

exports.budget = async function (req, res) {
  return await dashboardModel.budget(req, res);
};
exports.items = async function (req, res) {
  return await dashboardModel.items(req, res);
};
