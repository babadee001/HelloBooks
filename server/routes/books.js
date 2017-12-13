import express from 'express';
import dotenv from 'dotenv';
import BooksController from '../controllers/books';
import Check from '../helpers/validation';

const app = express.Router();
dotenv.load(); // Get all books
/**
 * @swagger
 * definition:
 *   books:
 *     properties:
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       quantity:
 *         type: integer
 *       category:
 *         type: string
 *       description:
 *         type: string
 *
 */
/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     tags:
 *       - books
 *     description: Returns all books
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/books'
 *     responses:
 *       200:
 *         description: An array of books
 *       401:
 *         description: Invalid token provided or User not logged in
 */
app.route('/')
  .get(Check.isLoggedIn, BooksController.list);
app.route('/')
/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     tags:
 *       - books
 *     description: Creates a new book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: details
 *         description: The details of the book
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/books'
 *     responses:
 *       200:
 *         description: Book added successfully
 *       401:
 *         description: User not logged in, User not an admin
 *       400:
 *         description: Invalid or missing details supplied
 */
  .post(Check.validateBook, Check.isAdmin,
    BooksController.create);
app.route('/:bookId')
/**
 * @swagger
 * /api/v1/books/{bookId}:
 *   put:
 *     tags:
 *       - books
 *     description: Modifies a single book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: The id of the book to modify
 *         in: path
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/books'
 *       - name: xaccesstoken
 *         description: Authorization token for this request
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       401:
 *         description: User not logged in, User not an admin
 *       400:
 *         description: Invalid or missing bookId supplied
 */
  .put(Check.isAdmin, Check.validateBook,
    BooksController.edit);// modify book
app.route('/:bookId')
/**
 * @swagger
 * /api/v1/books/{bookId}:
 *   delete:
 *     tags:
 *       - books
 *     description: Deletes a single book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: The id of the book to be deleted
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
 *         description: book deleted
 *       401:
 *         description: User not logged in, User not an admin
 *       400:
 *         description: Invalid or missing bookId supplied
 */
  .delete(Check.isAdmin, BooksController.erase);
export default app;
