import db from '../models';

// Get access to books and borrowed model
const { Books } = db;
const { Borrowed } = db;

module.exports = {
/**
   * @method create
   * 
   * @description This method handles creating new books request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  create(req, res) {
    return Books
      .create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        description: req.body.description,
        quantity: req.body.quantity,
        isbn: req.body.isbn,
        cover: req.body.cover
      })
      .then(() => res.status(201).send({
        message: 'Book added successfully',
      }))
      .catch(error => res.status(400).send(error));
  },
 
  /**
   * @method list
   * 
   * @description This method handles get all books request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  list(req, res) {
    return Books
      .all()
      .then(books => res.status(200).send(books))
      .catch(error => res.status(400).send(error));
  },

  /**
   * @method borrow
   * 
   * @description This method handles borrow books request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
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
            return Borrowed
              .create({
                bookId: req.params.bookId,
                userId: req.params.userId,
                description: books.description,
                cover: books.cover,
                title: books.title,
                expires: due,
                returned: false,
                returnDate: due,
              })
              .then(() => res.status(201).json({
                message: 'You have successfully borrowed the book',
              }))
              .then(() => Books
                .update({
                  quantity: books.quantity - 1,
                }, {
                  where: {
                    id: req.params.bookId,
                  },
                })
                .catch(error => error));
          });
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   * @method edit
   * 
   * @description This method handles edit books request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  edit(req, res) {
    return Books.update(req.body, {
      where: {
        id: req.params.bookId
      }
    })
      .then(() => {
        Books.findById(req.params.bookId).then((book) => {
          res.status(200).send({
            book,
            message: 'Book updated successfully!'
          });
        });
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   * @method showborrowed
   * 
   * @description This method handles showing borrowed books request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
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
          res.status(200).send({
            message: 'All books returned',
            count: 0
          });
        } else {
          res.status(200).send({
            books,
            count: books.length
          });
        }
      })
      .catch(error => res.status(404).send(error));
  },

  /**
   * @method returnBook
   * 
   * @description This method handles returning of books request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
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
      .then(() =>
        Books.findById(req.params.bookId).then((book) => {
          Books.update(
            {
              quantity: book.quantity + 1
            },
            {
              where: {
                id: req.params.bookId
              }
            }
          ).then(() => {
            res.status(201).send({
              message: 'Book returned successfully',
              book
            });
          });
        })
    ).catch(error => res.status(400).send(error));
  },

  /**
   * @method erase
   * 
   * @description This method handles delete books request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  erase(req, res) {
    return Books
      .findById(req.params.bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return book
          .destroy()
          .then(() => res.status(201).send({
            message: 'book deleted',
            id: req.params.bookId
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   * @method listBorrowed
   * 
   * @description This method handles showing all borrowed books request
   * 
   * @param { object} req HTTP request
   * 
   * @param { object} res HTTP response
   * 
   * @returns { object } response message
   */
  listBorrowed(req, res) {
    return Borrowed
      .all()
      .then(borrowed => res.status(200).send(borrowed))
      .catch(error => res.status(400).send(error));
  },
};
