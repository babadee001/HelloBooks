import express from 'express';
import dotenv from 'dotenv';
import UsersController from '../controllers/users';
import BooksController from '../controllers/books';
import Check from '../helpers/validation';

dotenv.load();
const adminRoute = process.env.route;
const app = express.Router();

app.route('/') // Get all users
  .get(Check.isAdmin, UsersController.list);
app.route('/:userId') // Get all users
  .get(Check.isLoggedIn, UsersController.userHistory);
app.route('/signup')
  .post(Check.validateInput, UsersController.create);
app.route('/signin')
  .post(Check.validateLogin, UsersController.signin);
app.route(adminRoute)
  .post(Check.validateInput, UsersController.admin);
app.route('/:userId/books/:bookId')
  .post(Check.isLoggedIn, BooksController.borrow);
app.route('/:userId/books/:bookId')
  .put(Check.isLoggedIn, BooksController.returnBook);
app.route('/:userId/books')
  .get(Check.isLoggedIn, BooksController.showBorrowed);
export default app;
