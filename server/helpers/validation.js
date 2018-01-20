import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/';

dotenv.load();
const secret = process.env.SECRETKEY;
const adminSecret = process.env.ADMINSECRET;
const { Users } = db;

export default {
  /**
   * @method validateInput
   * 
   * @description This method handles validation of users input
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  validateInput(req, res, next) {
    req.checkBody(
      {
        username: {
          notEmpty: true,
          isLength: {
            options: [{ min: 3 }],
            errorMessage: 'Username is required',
          },
          errorMessage: 'username is required and should contain no spaces or special characters',
        },
        password: {
          notEmpty: true,
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

  /**
   * @method validateLogin
   * 
   * @description This method handles validation of login input
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
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
  
  /**
   * @method validateBook
   * 
   * @description This method handles validations of book input
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  validateBook(req, res, next) {
    req.checkBody(
      {
        cover: {
          notEmpty: true,
          errorMessage: 'Please upload a cover',
        },
        title: {
          notEmpty: true,
          errorMessage: 'Enter a valid title',
        },
        description: {
          notEmpty: true,
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
          errorMessage: 'Enter valid author name',
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

  /**
   * @method isLoggedIn
   * 
   * @description This method checks for logged in users
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
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
  
  /**
   * @method isAdmin
   * 
   * @description This method handles check for admin authentication of users
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  isAdmin(req, res, next) {
    const token = req.headers.xaccesstoken;
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded.currentUser.isAdmin === 1) {
        next();
      } else {
        res.status(401)
          .json({
            message: 'Operation failed. Admin privileges needed.'
          });
      }
    } else {
      return res.status(401)
        .send({
          message: 'Access denied, you have to be logged in to perform this operation',
        });
    }
  },
};
