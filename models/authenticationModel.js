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

async function signUp(req, res) {
  try {
    let formData = [];
    const actualPass = req.body.txtPassword;

    if (req.body.txtPassword && req.body.intType == 1) {
      req.body.txtPassword = await genHashedPass(req.body.txtPassword);
    }

    //signUp the user
    formData.push(req.body.txtUsername || "");
    formData.push(req.body.txtEmail || "");
    formData.push(req.body.txtPassword || "");
    formData.push(req.body.intType || 1);

    console.log("formData", formData);

    //Authenticate the username and password.
    const result = await db.query(config.sp_Authentication, formData);

    console.log("result", result);

    if (result[0][0].returnMessage == "Email Id Already Exist") {
      config.statusCode = 500;
      config.returnData.message = result[0][0].returnMessage;
    } else {
      config.statusCode = 200;
      config.returnData.message = result[0][0].returnMessage;
      config.returnData.result = result[1];

      if (req.body.intType == 1) {
        const username = req.body.txtUsername || "";
        const password = actualPass || "";

        // Send Pin to User
        config.transporter.use("compile", hbs(config.handlebarOptions));

        var mailOptions = {
          from: '"Penny Wise" <imaginetventurestest123@gmail.com>', // sender address
          to: req.body.txtEmail, // list of receivers
          cc: "soumyadeep@imaginetventures.com",
          subject: "PennyWise User Pin Email",
          template: "signup-cred-email", // the name of the template file i.e email.handlebars
          context: {
            username: username,
            password: password,
          },
        };

        // trigger the sending of the E-mail
        config.transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: " + nodemailer.getTestMessageUrl(info));
        });
      }
    }
  } catch (error) {
    config.statusCode = 500;
    config.returnData.result = [];
    config.returnData.message = "Something went wrong";
  }

  return res.status(config.statusCode).json(config.returnData);
}

async function logIn(req, res) {
  try {
    console.log("login");
    let user = "";
    let token = "";

    console.log(req.body.txtEmail);
    console.log(req.body.txtPassword);

    if (req.body.txtEmail) {
      user = await db.query("SELECT * from sign_up_users where email = ?", [
        req.body.txtEmail,
      ]);

      console.log("user", user);

      let isValid = await bcrypt.compare(
        req.body.txtPassword,
        user[0].password
      );

      if (isValid) {
        token = jwt.sign(
          { user: user[0].user_name, email: user[0].email },
          config.SecretKey
        );
        config.statusCode = 200;
        config.returnData.result = [{ token: token }, { user: user[0] }];
        config.returnData.message = "Logged In Successfully";
      } else {
        config.statusCode = 400;
        config.returnData.result = [];
        config.returnData.message = "Invalid Email or Password";
      }
    }
  } catch (error) {
    config.statusCode = 500;
    config.returnData.result = [];
    config.returnData.message = "Invalid Email or Password";
  }

  console.log(config.statusCode);
  console.log(config.returnData);
  return res.status(config.statusCode).json(config.returnData);
}

async function forgotPass(req, res) {
  try {
    let formData = [];
    if (req.body.txtPassword) {
      req.body.txtPassword = await genHashedPass(req.body.txtPassword);
    }
    //verify reset password OTP.
    formData.push(req.body.txtEmail ? req.body.txtEmail : 0); //txtEmail
    formData.push(req.body.txtPassword ? req.body.txtPassword : 0); //txtPassword
    formData.push(req.body.intType ? req.body.intType : 3); //intType

    //Authenticate the username and password.
    const result = await db.query(config.sp_Authentication, formData);

    // use a template file with nodemailer
    config.transporter.use("compile", hbs(config.handlebarOptions));

    var mailOptions = {
      from: '"KG BuildTech" <imaginetventurestest123@gmail.com>', // sender address
      to: req.body.txtUsername, // list of receivers
      // cc: "ranjith@imaginetventures.com",
      subject: "KG BuildTech Forgot password Email",
      template: "password-reset-email", // the name of the template file i.e email.handlebars
      context: {
        username: result[0][1] ? result[0][1].username : req.body.txtUsername, // replace {{username}} with Adebola
      },
    };

    // trigger the sending of the E-mail
    config.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + nodemailer.getTestMessageUrl(info));
    });

    config.statusCode = 200;
    config.returnData.result = result[1];
    config.returnData.message = result[0][0].returnMessage;
  } catch (error) {
    config.statusCode = 500;
    config.returnData.result = [];
    config.returnData.message = result[0][0].returnMessage;
  }

  return res.status(config.statusCode).json(config.returnData);
}

module.exports = {
  signUp,
  logIn,
  forgotPass,
};
