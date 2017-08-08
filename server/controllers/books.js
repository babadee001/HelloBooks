const Book = require('../models').Books;
const borrowed = require('../models').Borrowed;

module.exports = {
  create(req, res) {
    return Book
      .create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        description: req.body.description,
        quantity: req.body.quantity,
      })
      .then(book => res.status(201).send({
        message: 'Book added successfully',
      }))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Book
      .all()
      .then(books => res.status(200).send(books))
      .catch(error => res.status(400).send(error));
  },
  borrow(req, res) {
    return borrowed
    
      .create({
        bookId: req.params.bookId,
        userId: req.params.userId,
      })
      .then(() => res.status(201).send({
        message: 'You have successfully borrowed the book',
      }))
      .catch(error => res.status(400).send(error));
  },
  edit(req, res) {
    return Book
      .findOne({
        where: { id: req.params.bookId },
        attributes: ['id'],
      })
      .then(book => {
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
  showBorrowed(req, res) {
    return borrowed
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
    return borrowed
      .update({
        returnDate: Date.now(),
        returned: true,
      },
      {
        where: {
          bookId: req.params.bookId,
          userId: req.params.userId,
        }
      })
      .then(() => res.status(200).send(
        {
          message: 'Book returned!',
        }
      ))
      .catch(error => res.status(400).send(error));
  },
};
