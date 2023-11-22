const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.generateRandomPin = async () => {
  const pin = crypto.randomInt(1000, 10000);
  return pin.toString();
};

exports.genHashedPass = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(pass, salt);
  return hashedPass;
};
