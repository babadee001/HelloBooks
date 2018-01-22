import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/';

dotenv.load();
const secret = process.env.SECRETKEY;
const adminSecret = process.env.ADMINSECRET;

const { Users } = db;
const { Borrowed } = db;

export default {
  /**
   * @method create
   * 
   * @description This method handles creation of new users request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  create(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    return Users
      .create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        membership: req.body.membership,
      })
      .then((user) => {
        const currentUser = {
          userId: user.id,
          username: user.username,
          password: user.password,
          isAdmin: user.isAdmin,
          email: user.email,
          membership: user.membership };
        const token = jwt.sign(
          { currentUser,
          }, secret, { expiresIn: 60  * 60 * 24 }
        );
        return res.status(201).send({
          message: 'Signed up successfully',
          Token: token,
          success: true,
        });
      })
      .catch(() => res.status(409).send({
        message: 'Username or email already exists',
      }));
  },

  /**
   * @method list
   * 
   * @description This method handles getting all registered users request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  list(req, res) {
    return Users
      .all()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },
  
  /**
   * @method admin
   * 
   * @description This method handles creation of new admin users request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  admin(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    return Users
      .create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        membership: req.body.membership,
        isAdmin: 1,
      })
      .then((user) => {
        const currentUser = {
          userId: user.id,
          username: user.username,
          password: user.password,
          email: user.email,
          membership: user.membership,
        };
        const token = jwt.sign(
          { currentUser,
          }, adminSecret
        );
        return res.status(201).send({
          message: 'Admin Signed up successfully',
          Token: token,
        });
      })
      .catch(() => res.status(400).send({
        message: 'Username or email already exists',
      }));
  },

  /**
   * @method signin
   * 
   * @description This method handles authentication of users request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  signin(req, res) {
    return Users
      .findOne({
        where: { username: req.body.username },
      })
      .then((user) => {
        const currentUser = {
          userId: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
          membership: user.membership };
        const token = jwt.sign(
          {
            currentUser,
          },
          secret, { expiresIn: 60 * 60 * 24 }
        );
        res.status(200)
          .json({
            message: 'Log in successful',
            Token: token,
          });
      });
  },

  /**
   * @method userHistory
   * 
   * @description This method handles getting history of users request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  userHistory(req, res) {
    return Borrowed
      .findAll({
        where: {
          userId: req.params.userId,
        },
      })
      .then((books) => {
        if (books.length < 1) {
          res.status(200).send({
            message: 'You have never borrowed a book',
          });
        } else {
          res.status(200).send(books);
        }
      })
      .catch(error => res.status(404).send(error));
  },

  /**
   * @method checkExisting
   * 
   * @description This method handles checking of existing users request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  checkExisting(req, res) {
    return Users
      .findOne({
        where: { 
          email: req.body.email
        },
      })
      .then((user) => {
        res.status(200).json({
          message: user
        })
      }).catch(error =>{
        res.status(404).json({
          message:error
        })
      })
  },
};
