import express from 'express';
import dotenv from 'dotenv';
import UsersController from '../controllers/users';
import BooksController from '../controllers/books';
import Check from '../helpers/validation';

dotenv.load();
const adminRoute = process.env.route;
const app = express.Router();

app.route('/api/v1/users/signup')
  .post(Check.validateInput, UsersController.create);
app.route('/api/v1/users/signin')
  .post(Check.validateLogin, UsersController.signin);
app.route(adminRoute)
  .post(Check.validateInput, UsersController.admin);
app.route('/api/v1/users/:userId/books/:bookId')
  .post(Check.isLoggedIn, BooksController.borrow);
app.route('/api/v1/users/:userId/books/:bookId')
  .put(Check.isLoggedIn, BooksController.returnBook);
app.route('/api/v1/users/:userId/books')
  .get(Check.isLoggedIn, BooksController.showBorrowed);
export default app;
