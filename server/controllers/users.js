import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/';

dotenv.load();
const secret = process.env.secretKey;
const adminSecret = process.env.adminSecret;

const { Users } = db;
const { Borrowed } = db;

export default {
  /** new user
   * @param  {object} req request
   * @param  {object} res response
   * Route: POST: users/signup  
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
          }, secret
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
  list(req, res) {
    return Users
      .all()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },
  // Create an admin 
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
          secret
        );
        res.status(200)
          .json({
            message: 'Log in successful',
            Token: token,
          });
      });
  },
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
