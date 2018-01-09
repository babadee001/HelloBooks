import express from 'express';
import dotenv from 'dotenv';
import UsersController from '../controllers/users';
import BooksController from '../controllers/books';
import Check from '../helpers/validation';

dotenv.load();
const adminRoute = process.env.route;
const app = express.Router();

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
 *         type: string
 *       membership:
 *         type: string
 *
 */
/**
 * @swagger
 * definition:
 *   signin:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *
 */
app.route('/') // Get all users
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - users
 *     description: Returns an array of all users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns all users
 *       401:
 *         description: User not logged in, User not an admin
 *     schema:
 *       $ref: '#/definitions/users'
 */
  .get(Check.isAdmin, UsersController.list);
app.route('/:userId')
/**
 * @swagger
 * /api/v1/users/{userId}:
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
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of all books (returned and unreturned) borrowed by the user.
 *       401:
 *         description: User not logged in, invalid access token.
 */
  .get(Check.isLoggedIn, UsersController.userHistory);
app.route('/signup')
/**
 * @swagger
 * /api/v1/users/signup:
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
 *         required: false
 *         type: string
 *         schema:
 *           $ref: '#/definitions/users'
 *     responses:
 *       201:
 *         description: Signed up successfully
 *       400:
 *         description: Invalid input(email, password...) details
 *       409:
 *         description: Existing details
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
 *           $ref: '#/definitions/signin'
 *     responses:
 *       200:
 *         description: Log in successful
 *       401:
 *         description: Invalid username or password
 */
  .post(Check.validateLogin, UsersController.signin);
app.route(adminRoute)
  .post(Check.validateInput, UsersController.admin);
app.route('/:userId/books/:bookId')
/**
 * @swagger
 * /api/v1/users/{userId}/books/{bookId}:
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
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: false
 *         type: string
 *     responses:
 *       201:
 *         description: You have successfully borrowed the book
 *       401:
 *         description: User not logged in, book already borrowed and not returned
 *       404:
 *         description: Book not in database
 */
  .post(Check.isLoggedIn, BooksController.borrow);
app.route('/:userId/books/:bookId')
/**
 * @swagger
 * /api/v1/users/{userId}/books/{bookId}:
 *   put:
 *     tags:
 *       - users
 *     description: Users can return a borrowed book
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
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: false
 *         type: string
 *     responses:
 *       201:
 *         description: Book returned!
 *       401:
 *         description: User not logged in
 */
  .put(Check.isLoggedIn, BooksController.returnBook);
app.route('/:userId/books')
/**
 * @swagger
 * /api/v1/users/{userId}/books?returned=false:
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
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of books borrowed but not returned, a message indicating no unreturned book
 *       401:
 *         description: User not logged in
 */
  .get(Check.isLoggedIn, BooksController.showBorrowed);
export default app;
