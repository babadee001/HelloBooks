import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import Server from '../app';
import models from '../server/models';

dotenv.load();
process.env.NODE_ENV = 'test';
const should = chai.should();
const { adminToken, userToken } = process.env;

chai.use(chaiHttp);
before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Test', () => {
  it('Admin should be able to add books', (done) => {
    chai.request(Server)
      .post('/api/v1/books/')
      .set('xaccesstoken', adminToken)
      .send({
        title: 'HarryPorter',
        author: 'babadee',
        description: 'A film about magic',
        catId: 2,
        quantity: '5',
        cover: 'testcover',
        isbn: '123456-555'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.newBook.title.should.equal('HarryPorter');
        res.body.newBook.author.should.equal('babadee');
        res.body.newBook.description.should.equal('A film about magic');
        res.body.newBook.catId.should.equal(2);
        res.body.newBook.quantity.should.equal(5);
        res.body.newBook.cover.should.equal('testcover');
        res.body.newBook.isbn.should.equal('123456-555');
        res.body.message.should.equal('Book added successfully');
        done();
      });
  });

  it('Admin should be able to add categories', (done) => {
    chai.request(Server)
      .post('/api/v1/books/category')
      .set('xaccesstoken', adminToken)
      .send({
        name: 'Action',
        description: 'Not boring stuffs'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.message.should.equal('Category added successfully');
        res.body.newCategory.name.should.equal('Action');
        res.body.newCategory.description.should.equal('Not boring stuffs');
        done();
      });
  });

  it('Category names should be unique', (done) => {
    chai.request(Server)
      .post('/api/v1/books/category')
      .set('xaccesstoken', adminToken)
      .send({
        name: 'Action',
        description: 'Not boring stuffs'
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.should.be.json;
        res.body.message.should.equal('Category with that name exists');
        done();
      });
  });

  it('Non Admins cant add categories', (done) => {
    chai.request(Server)
      .post('/api/v1/books/category')
      .set('xaccesstoken', userToken)
      .send({
        name: 'Epic',
        description: 'Good category'
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.json;
        res
          .body
          .message
          .should
          .equal('Operation failed. Admin privileges needed.');
        done();
      });
  });

  it('Logged in users should not be able to add books', (done) => {
    chai.request(Server)
      .post('/api/v1/books/')
      .set('xaccesstoken', userToken)
      .send({
        title: 'HarryPorter',
        author: 'babadee',
        description: 'A film about magic',
        catId: 2,
        quantity: '5',
        cover: 'testcover',
        isbn: '123456-555'
      })
      .end((err, res) => {
        res.should.have.status(403);
        res
          .body
          .message
          .should
          .equal('Operation failed. Admin privileges needed.');
        done();
      });
  });
  it('Users not logged in should not be able to add books', (done) => {
    chai.request(Server)
      .post('/api/v1/books/')
      .send({
        title: 'HarryPorter',
        author: 'babadee',
        description: 'A film about magic',
        catId: 2,
        quantity: '5',
        cover: 'testcover',
        isbn: '123456-555'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res
          .body
          .message
          .should
          .equal('Access denied, you have to be logged for this operation');
        done();
      });
  });

  it('Get all books in the library', (done) => {
    chai.request(Server)
      .get('/api/v1/books/')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.status.should.equals(200);
        res.body.should.be.a('array');
        res.body[0].should.have.property('title');
        res.body[0].should.have.property('author');
        res.body[0].should.have.property('description');
        res.body[0].should.have.property('isbn');
        res.body[0].should.have.property('cover');
        res.body[0].should.have.property('quantity');
        res.body[0].should.have.property('catId');
        res.body.length.should.equals(1);
        done();
      });
  });

  it('Users not logged in cant get all books in the library', (done) => {
    chai.request(Server)
      .get('/api/v1/books/')
      .end((err, res) => {
        res.status.should.equals(401);
        res.should.be.json;
        res
          .body
          .message
          .should
          .equal('Access denied, you have to be logged for this operation');
        done();
      });
  });

  it('Cant get all books in the library with invalid token', (done) => {
    chai.request(Server)
      .get('/api/v1/books/')
      .set('xaccesstoken', 'faketoken')
      .end((err, res) => {
        res.status.should.equals(403);
        res.should.be.json;
        res.body.message.should.equal('Access Denied. Admin privileges needed');
        done();
      });
  });

  it('Allows logged in users to borrow books', (done) => {
    chai.request(Server)
      .post('/api/v1/users/1/books/1')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(201);
        res
          .body
          .message
          .should
          .equal('You have successfully borrowed the book');
        res.body.borrowed.should.have.property('title');
        res.body.borrowed.should.have.property('cover');
        res.body.borrowed.should.have.property('bookId');
        res.body.borrowed.should.have.property('expires');
        res.body.borrowed.should.have.property('returnDate');
        res.body.borrowed.should.have.property('returned');
        done();
      });
  });

  it('Doesnt allow users to borrow books already borrowed', (done) => {
    chai.request(Server)
      .post('/api/v1/users/1/books/1')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(422);
        res
          .body
          .message
          .should
          .equal('You cant borrow this book again till you return');
        done();
      });
  });

  it('Logged in users cant borrow books not in the library', (done) => {
    chai.request(Server)
      .post('/api/v1/users/1/books/100')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.equal('Wrong book id. Not in database.');
        done();
      });
  });

  it('Users not logged in cant borrow a book', (done) => {
    chai.request(Server)
      .post('/api/v1/users/1/books/1')
      .end((err, res) => {
        res.should.have.status(401);
        res
          .body
          .message
          .should
          .equal('Access denied, you have to be logged for this operation');
        done();
      });
  });

  it('Users cant borrow a book with invalid token', (done) => {
    chai.request(Server)
      .post('/api/v1/users/1/books/1')
      .set('xaccesstoken', 'wrongtoken')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.equal('Access Denied. Admin privileges needed');
        done();
      });
  });

  it('Users can return borrowed books', (done) => {
    chai.request(Server)
      .put('/api/v1/users/1/books/1')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal('Book returned successfully');
        res.body.book.should.have.property('title');
        res.body.book.should.have.property('cover');
        res.body.book.should.have.property('description');
        res.body.book.should.have.property('catId');
        res.body.book.should.have.property('author');
        res.body.book.should.have.property('isbn');
        res.body.book.should.have.property('quantity');
        done();
      });
  });

  it('Users can get all books borrowed and not returned', (done) => {
    chai.request(Server)
      .get('/api/v1/users/1/books')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.status.should.equals(200);
        res.body.message.should.equal('All books returned');
        done();
      });
  });

  it('Admin should be able to modify books', (done) => {
    chai.request(Server)
      .put('/api/v1/books/1')
      .set('xaccesstoken', adminToken)
      .send({
        title: 'HarryPorterrrr',
        author: 'babadeewwww',
        description: 'A film about magic',
        quantity: '25',
        cover: 'newtestcover',
        catId: 3,
        isbn: '123-abc'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Book updated successfully!');
        res.body.book.title.should.equal('HarryPorterrrr');
        res.body.book.description.should.equal('A film about magic');
        res.body.book.quantity.should.equal(25);
        res.body.book.cover.should.equal('newtestcover');
        done();
      });
  });

  it('Non Admin should not be able to modify books', (done) => {
    chai.request(Server)
      .put('/api/v1/books/1')
      .set('xaccesstoken', userToken)
      .send({
        title: 'HarryPorterrrr',
        author: 'babadeewwww',
        description: 'A film about magic',
        category: 'Magic and fantasy',
        quantity: '25',
      })
      .end((err, res) => {
        res.should.have.status(403);
        res
          .body
          .message
          .should.equal('Operation failed. Admin privileges needed.');
        done();
      });
  });

  it(`Should display 'Please select a category' when category id 
  is not supplied to the Add Book route`, (done) => {
    chai.request(Server)
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('xaccesstoken', adminToken)
      .set('Content-Type', 'application/json')
      .send({
        title: 'HarryPorter',
        author: 'babadee',
        description: 'A film about magic',
        quantity: '5',
        cover: 'testcover',
        isbn: '123456-555'
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Please select a category');
        done();
      });
  });

  it('Non Admin should not be able to delete book', (done) => {
    chai.request(Server)
      .delete('/api/v1/books/1')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(403);
        res
          .body
          .message
          .should.equals('Operation failed. Admin privileges needed.');
        done();
      });
  });
});
