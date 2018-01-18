import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import Server from '../app';
import models from '../server/models';

dotenv.load();
process.env.NODE_ENV = 'test';
const should = chai.should();
const adminToken = process.env.adminToken;
const userToken = process.env.userToken;

chai.use(chaiHttp);
before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('Test', () => {
  it('should access api end point', (done) => {
    chai.request(Server)
      .get('/api')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  it('it should GET a welcome message', (done) => {
    chai.request(Server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  it('creates new user', (done) => {
    chai.request(Server)
      .post('/api/v1/users/signup/')
      .send({
        password: 'testpassworde',
        username: 'testusernamew',
        email: 'test@user.co',
        membership: 'professional',
      })
      .end((err, res) => {
        res.body.message.should.equal('Signed up successfully');
        res.should.have.status(201);
        res.should.be.json;
        done();
      });
  });
  it('Does not signup without email', (done) => {
    chai.request(Server)
      .post('/api/v1/users/signup/')
      .send({
        password: 'testpassword',
        username: 'testusername2',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equals('Enter a valid email');
        res.should.be.json
        done();
      });
  });
  it('Does not signup without username', (done) => {
    chai.request(Server)
      .post('/api/v1/users/signup/')
      .send({
        password: 'testpassword',
        email: 'test@yag.com',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equals('username is required and should contain no spaces or special characters');
        done();
      });
  });
  it('should login user with correct details', (done) => {
    chai.request(Server)
      .post('/api/v1/users/signin/')
      .type('form')
      .send({
        password: 'testpassworde',
        username: 'testusernamew',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.Token.should.not.equals(null);
        done();
      });
  });
  it('should request for proper email', (done) => {
    chai.request(Server)
      .post('/api/v1/users/signup/')
      .send({
        password: 'testpasswordd',
        username: 'testusernamee',
        email: 'wrongformat',
        membership: 'professional',
      })
      .end((err, res) => {
        res.body.message.should.equal('Enter a valid email');
        res.should.be.json;
        res.should.have.status(400);
        done();
      });
  });
  it('should reject signin without correct details', (done) => {
    chai.request(Server)
      .post('/api/v1/users/signin/')
      .send({
        username: 'testusernamee',
        password: 'wrongpassword',
      })
      .end((err, res) => {
        res.should.be.json
        res.body.message.should.equal('Invalid username or password');
        res.should.have.status(401);
        done();
      });
  });
  it('Admin should be able to add books', (done) => {
    chai.request(Server)
      .post('/api/v1/books/')
      .set('xaccesstoken', adminToken)
      // .type('form')
      .send({
        title: 'HarryPorter',
        author: 'babadee',
        description: 'A film about magic',
        category: 'Magic and fantasy',
        quantity: '5',
        cover: 'testcover'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.message.should.equal('Book added successfully');
        done();
      });
  });
  it('Logged in users should not be able to add books', (done) => {
    chai.request(Server)
      .post('/api/v1/books/')
      .set('xaccesstoken', userToken)
      // .type('form')
      .send({
        title: 'HarryPorter',
        author: 'babadee',
        description: 'A film about magic',
        category: 'Magic and fantasy',
        quantity: '5',
        cover: 'testcover'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Operation failed. Admin privileges needed.');
        done();
      });
  });
  it('Users not logged in should not be able to add books', (done) => {
    chai.request(Server)
      .post('/api/v1/books/')
      // .set('xaccesstoken', userToken)
      .send({
        title: 'HarryPorter',
        author: 'babadee',
        description: 'A film about magic',
        category: 'Magic and fantasy',
        quantity: '5',
        cover: 'testcover'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Access denied, you have to be logged in to perform this operation');
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
        res.body.length.should.equals(1);
        done();
      });
  });
  it('Users not logged in cant get all books in the library', (done) => {
    chai.request(Server)
      .get('/api/v1/books/')
      .end((err, res) => {
        res.status.should.equals(401);
        res.should.be.json
        res.body.message.should.equal('Access denied, you have to be logged in to perform this operation');
        done();
      });
  });
  it('Cant get all books in the library with invalid token', (done) => {
    chai.request(Server)
      .get('/api/v1/books/')
      .set('xaccesstoken', 'faketoken')
      .end((err, res) => {
        res.status.should.equals(401);
        res.should.be.json
        res.body.message.should.equal('Access Denied. You are not authorized.');
        done();
      });
  });
  it('Allows logged in users to borrow books', (done) => {
    chai.request(Server)
      .post('/api/v1/users/1/books/1')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal('You have successfully borrowed the book');
        done();
      });
  });
  it('Doesnt allows logged in users to borrow books they already borrowed without returning', (done) => {
    chai.request(Server)
      .post('/api/v1/users/1/books/1')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('You cant borrow this book again till you return');
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
      // .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Access denied, you have to be logged in to perform this operation');
        done();
      });
  });
  it('Users cant borrow a book with invalid token', (done) => {
    chai.request(Server)
      .post('/api/v1/users/1/books/1')
      .set('xaccesstoken', 'wrongtoken')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Access Denied. You are not authorized.');
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
        category: 'Magic and fantasy',
        quantity: '25',
        cover: 'newtestcover'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Book updated successfully!');
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
        res.should.have.status(401);
        res.body.message.should.equal('Operation failed. Admin privileges needed.');
        done();
      });
  });
  it('Admin should be able to GET all users', (done) => {
    chai.request(Server)
      .get('/api/v1/users/')
      .set('xaccesstoken', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
  it('Non Admin should not be able to GET all users', (done) => {
    chai.request(Server)
      .get('/api/v1/users/')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equals('Operation failed. Admin privileges needed.');
        done();
      });
  });
  it('Admin should be able to delete book', (done) => {
    chai.request(Server)
      .delete('/api/v1/books/1')
      .set('xaccesstoken', adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equals('book deleted');
        done();
      });
  });
  it('Non Admin should not be able to delete book', (done) => {
    chai.request(Server)
      .delete('/api/v1/books/1')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equals('Operation failed. Admin privileges needed.');
        done();
      });
  });
  it('Users can view their borrowing history, returned or not', (done) => {
    chai.request(Server)
      .get('/api/v1/users/1')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
  it('Users with no borrowing history should be notified', (done) => {
    chai.request(Server)
      .get('/api/v1/users/100')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equals('You have never borrowed a book');
        done();
      });
  });
});
