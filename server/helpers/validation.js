import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';

dotenv.load();
const secret = process.env.secretKey;
const adminSecret = process.env.adminSecret;
const { Users } = db;

export default {
  // Check if input fields are entered correctly
  validateInput(req, res, next) {
    req.checkBody(
      {
        username: {
          notEmpty: true,
          isAlphanumeric: false,
          isLength: {
            options: [{ min: 3 }],
            errorMessage: 'username should be at least three characters',
          },
          errorMessage: 'username is required and should contain no spaces or special characters',
        },
        password: {
          notEmpty: true,
          isAlphanumeric: false,
          isLength: {
            options: [{ min: 4 }],
            errorMessage: 'password should be at least four characters',
          },
          errorMessage: 'password field is required and should contain no spaces or special characters',
        },
        email: {
          isEmail: true,
          notEmpty: true,
          errorMessage: 'Enter a valid email',
        },
        membership: {
          isAlpha: false,
          notEmpty: true,
          errorMessage: 'Membership is required, can not be empty and must be alphabet',
        },
      }
    );
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    req.userInput = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      membership: req.body.membership,
    };
    next();
  },
  validateLogin(req, res, next) {
    req.checkBody(
      {
        username: {
          notEmpty: true,
          isAlphanumeric: false,
          errorMessage: 'Enter a valid username',
        },
        password: {
          notEmpty: true,
          isAlphanumeric: false,
          errorMessage: 'Enter valid password',
        },
      });
    Users.findOne(
      {
        where: {
          username: req.body.username,
        },
      })
      .then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          next();
        } else {
          return res.status(401)
            .json({
              message: 'Invalid username or password',
            });
        }
      });
  },
  // vallidation for book fields
  validateBook(req, res, next) {
    req.checkBody(
      {
        title: {
          notEmpty: true,
          // isAlphanumeric: true,
          errorMessage: 'Enter a valid title',
        },
        description: {
          notEmpty: true,
          // isAlphanumeric: true,
          errorMessage: 'Enter a valid description',
        },
        quantity: {
          notEmpty: true,
          isNumeric: false,
          isInt: {
            options: [{ min: 1 }],
            errorMessage: "quantity can't be less than 1",
          },
          errorMessage: 'Enter a valid quantity',
        },
        author: {
          notEmpty: true,
          // isAlpha: false,
          errorMessage: 'Enter valid author name',
        },
        category: {
          notEmpty: true,
          // isAlphanumeric: false,
          errorMessage: 'Enter valid category name',
        },
      });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    next();
  },
  // Check if a user is logged in. Requires jwt token
  isLoggedIn(req, res, next) {
    const token = req.headers.xaccesstoken;
    if (token) {
      jwt.verify(token, secret, (error) => {
        if (error) {
          res.status(401)
            .send({
              message: 'Access Denied. You are not authorized.'
            });
        } else {
          next();
        }
      });
    } else {
      return res.status(401)
        .send({
          message: 'Access denied, you have to be logged in to perform this operation',
        });
    }
  },
  // Check if user is an admin. Requires jwt token for admin.
  isAdmin(req, res, next) {
    const token = req.headers.xaccesstoken;
    if (token) {
      jwt.verify(token, adminSecret, (error) => {
        if (error) {
          res.status(401)
            .send({
              message: 'Operation failed. Invalid token provided.'
            });
        } else {
          next();
        }
      });
    } else {
      return res.status(401)
        .send({
          message: 'Access denied, you have to be logged in to perform this operation',
        });
    }
  },
};
