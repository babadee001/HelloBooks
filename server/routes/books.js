import express from 'express';
import dotenv from 'dotenv';
import BooksController from '../controllers/books';
import Check from '../helpers/validation';

const app = express.Router();
dotenv.load();
// Routes for books api
app.route('/') // Get all books
  .get(Check.isLoggedIn, BooksController.list);
app.route('/')
  .post(Check.validateBook, Check.isAdmin,
    BooksController.create);
app.route('/books/:bookId')
  .put(Check.isAdmin, Check.validateBook,
    BooksController.edit);// modify book
export default app;
