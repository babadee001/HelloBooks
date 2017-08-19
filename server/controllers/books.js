import db from '../models';

// Get access to books and borrowed model
const { Books } = db;
const { Borrowed } = db;

module.exports = {
  /** Admin add new book
   * @param  {object} req request
   * @param  {object} res response
   * Route: POST: /books  
   */ 
  // Add new book (by admin)
  create(req, res) {
    return Books
      .create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        description: req.body.description,
        quantity: req.body.quantity,
      })
      .then(() => res.status(201).send({
        message: 'Book added successfully',
      }))
      .catch(error => res.status(400).send(error));
  },
  /** displays all books
   * @param  {object} req request
   * @param  {object} res response
   *  Route: GET: api/books
   */
  // Get all books 
  list(req, res) {
    return Books
      .all()
      .then(books => res.status(200).send(books))
      .catch(error => res.status(400).send(error));
  },
  /** User can rent a book
   * @param  {object} req request
   * @param  {object} res response
   * Route: POST: /api/users/:Userid/books/:bookId
   */
  // Borrow a book (requires user id and book id)
  borrow(req, res) {
    const now = new Date();
    const due = now.setDate(now.getDate() + 15);
    return Borrowed
      .findOne({
        where: { bookId: req.params.bookId, userId: req.params.userId, returned: false },
        attributes: ['bookId', 'userId', 'returned'],
      })
      .then((bk) => {
        if (bk) {
          return res.status(401).send({
            message: 'You cant borrow this book again till you return',
          });
        }
        return Books
          .findOne({ where: { id: req.params.bookId } })
          .then((books) => {
            if (!books) {
              return res.status(404).send({
                message: 'Wrong book id. Not in database.',
              });
            }
            return Books
              .update({
                quantity: books.quantity - 1,
              }, {
                where: {
                  id: req.params.bookId,
                },
              })
              .then(() => {
                return Borrowed
                  .create({
                    bookId: req.params.bookId,
                    userId: req.params.userId,
                    expires: due,
                    returned: false,
                    returnDate: due,
                  })
                  .then(() => res.status(201).send({
                    message: 'You have successfully borrowed the book',
                  }))
                  .catch(error => res.status(400).send(error));
              })
              .catch(error => res.status(400).send(error));
          });
      })
      .catch(error => res.status(400).send(error));
  },
  /** Admin modify book details
   * @param  {object} request
   * @param  {object} resonse
   * Route: GET: /
   */
  // Modify a book information 
  edit(req, res) {
    return Books
      .findOne({
        where: { id: req.params.bookId },
        attributes: ['id'],
      })
      .then((book) => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return book
          .update({
            title: req.body.title || book.title,
            author: req.body.author || book.author,
            category: req.body.category || book.category,
            description: req.body.description || book.quantity,
            quantity: req.body.quantity,
          })
          .then(() => res.status(200).send({
            message: 'Book updated successfully',
          })) // Send back the updated book.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  /** Dislay users rented books
   * @param  {object} req request
   * @param  {0bject} res response
   * Route: GET: //api/users/:UserId/books?returned=false
   */
  showBorrowed(req, res) {
    return Borrowed
      .findAll({
        where: {
          returned: req.query.returned,
          userId: req.params.userId,
        },
      })
      .then((books) => {
        if (books.length < 1) {
          res.status(201).send({
            success: false,
            message: 'All books returned',
          });
        } else {
          res.status(201).send(books);
        }
      })
      .catch(error => res.status(404).send(error));
  },
  returnBook(req, res) {
    return Borrowed
      .update({
        returnDate: Date.now(),
        returned: true,
      },
      {
        where: {
          bookId: req.params.bookId,
          userId: req.params.userId,
        },
      })
      .then(() => res.status(200).send(
        {
          message: 'Book returned!',
        },
      ))
      .catch(error => res.status(400).send(error));
  },
  erase(req, res) {
    return Books
      .findById(req.params.bookId)
      .then((book) => {
        if (!book) {
          return res.status(400).send({
            message: 'Book Not Found',
          });
        }
        return book
          .destroy()
          .then(() => res.status(200).send({
            message: 'book deleted',
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
