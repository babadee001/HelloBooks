import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/';

dotenv.load();
const secret = process.env.secretKey;
const adminSecret = process.env.adminSecret;

const { Users } = db;

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
          username: user.username,
          password: user.password,
          isAdmn: user.isAdmin,
          email: user.email,
          membership: user.membership };
        const token = jwt.sign(
          { currentUser,
          }, secret,
        );
        return res.status(201).send({
          message: 'Signed up successfully',
          Token: token,
          success: true,
        });
      })
      .catch(() => res.status(400).send({
        message: 'Username or email already exists',
      }));
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
          username: user.username,
          password: user.password,
          email: user.email,
          isAdmn: user.isAdmin,
          membership: user.membership,
        };
        const token = jwt.sign(
          { currentUser,
          }, adminSecret,
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
          password: user.password,
          membership: user.membership };
        const token = jwt.sign(
          {
            currentUser,
          },
          secret,
        );
        res.status(200)
          .json({
            message: 'Log in successful',
            Token: token,
          });
      });
  },
};
