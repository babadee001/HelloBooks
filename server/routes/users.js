import express from 'express';
import dotenv from 'dotenv';
import UsersController from '../controllers/users';
import BooksController from '../controllers/books';
import Check from '../helpers/validation';

dotenv.load();
const adminRoute = process.env.route;
const app = express.Router();

app.route('/') // Get all users
/**
 * @swagger
 * definition:
 *   users:
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: integer
 *
 */
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns all users 
 *     schema:
 *       $ref: '#/definitions/users'
 */
  .get(Check.isAdmin, UsersController.list);
app.route('/:userId')
/**
 * @swagger
 * /api/v1/users/userId:
 *   get:
 *     tags:
 *       - users
 *     description: Get borrowing history for a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: The id of the user to check his/her borrowing history
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of all books (returned and unreturned) borrowed by the user.
 */
  .get(Check.isLoggedIn, UsersController.userHistory);
app.route('/signup')
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags:
 *       - users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: details
 *         description: The registration details of the user
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: Signed up successfully
 */
  .post(Check.validateInput, UsersController.create);
app.route('/signin')
/**
 * @swagger
 * /api/v1/users/signin:
 *   post:
 *     tags:
 *       - users
 *     description: Logs in a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: details
 *         description: The login details of the user
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: Log in successful
 */
  .post(Check.validateLogin, UsersController.signin);
app.route(adminRoute)
  .post(Check.validateInput, UsersController.admin);
app.route('/:userId/books/:bookId')
/**
 * @swagger
 * /api/v1/users/:userId/books/:bookId:
 *   post:
 *     tags:
 *       - users
 *     description: Users can borrow a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: The id of the user to borrow the book
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: The id of the book to be borrowed 
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: You have successfully borrowed the book
 */
  .post(Check.isLoggedIn, BooksController.borrow);
app.route('/:userId/books/:bookId')
/**
 * @swagger
 * /api/v1/users/:userId/books/:bookId:
 *   put:
 *     tags:
 *       - users
 *     description: Users can return a borrowed a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: The id of the user returning the book
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: The id of the book to be returned 
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Book returned!
 */
  .put(Check.isLoggedIn, BooksController.returnBook);
app.route('/:userId/books')
/**
 * @swagger
 * /api/v1/users/userId:/?returned=false:
 *   get:
 *     tags:
 *       - users
 *     description: Show books borrowed but not returned
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: The id of the user to check his/her unreturned history
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of books borrowed but not returned.
 */
  .get(Check.isLoggedIn, BooksController.showBorrowed);
export default app;
