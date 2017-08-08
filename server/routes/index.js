const usersController = require('../controllers').users;
const booksController = require('../controllers').books;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Hello-Books API!',
  }));

  app.post('/api/v1/signup', usersController.create);
  app.post('/api/v1/books', booksController.create);
  app.get('/api/v1/books', booksController.list);
  app.post('/api/v1/signin', usersController.signin);
  app.post('/api/v1/users/:userId/books/:bookId', booksController.borrow);
  app.put('/api/v1/books/:bookId', booksController.edit);
  app.get('/api/v1/users/:userId/books', booksController.showBorrowed);
  app.put('/api/v1/users/:userId/books/:bookId', booksController.returnBook);
};
