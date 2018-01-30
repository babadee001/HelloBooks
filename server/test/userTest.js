import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import Server from '../../app';
import models from '../../server/models';

dotenv.load();
process.env.NODE_ENV = 'test';
const should = chai.should();
const { adminToken, userToken, adminRoute } = process.env;

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
        membership: 'Gold',
      })
      .end((err, res) => {
        res.body.message.should.equal('Signed up successfully');
        res.should.have.status(201);
        res.should.be.json;
        res.body.user.username.should.equal('testusernamew');
        res.body.user.email.should.equal('test@user.co');
        res.body.user.membership.should.equal('Gold');
        res.body.Token.should.not.equals(null);
        done();
      });
  });

  it('creates new admin', (done) => {
    chai.request(Server)
      .post(adminRoute)
      .send({
        password: 'admin',
        username: 'admin',
        email: 'test@admin.co',
        membership: 'admin',
      })
      .end((err, res) => {
        res.body.message.should.equal('Admin added successfully');
        res.should.have.status(201);
        res.should.be.json;
        res.body.user.username.should.equal('admin');
        res.body.user.email.should.equal('test@admin.co');
        res.body.user.membership.should.equal('admin');
        res.body.Token.should.not.equals(null);
        done();
      });
  });

  it('Doesnt create new user with existing username', (done) => {
    chai.request(Server)
      .post('/api/v1/users/signup/')
      .send({
        password: 'testpassworde',
        username: 'testusernamew',
        email: 'test@user.com',
        membership: 'Gold',
      })
      .end((err, res) => {
        res.body.message.should.equal('Username or email already exists');
        res.should.have.status(409);
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
        res.should.be.json;
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
        res
          .body
          .message
          .should
          .equals('username is required with no special characters');
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
        const currentUser = jwt.decode(res.body.Token);
        currentUser.currentUser.username.should.equal('testusernamew');
        currentUser.currentUser.email.should.equal('test@user.co');
        currentUser.currentUser.membership.should.equal('Gold');
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

  it('should request for proper password', (done) => {
    chai.request(Server)
      .post('/api/v1/users/signup/')
      .send({
        password: 'te',
        username: 'babadee',
        email: 'email@email.com',
        membership: 'silver',
      })
      .end((err, res) => {
        res
          .body
          .message
          .should
          .equal('password should be at least four characters');
        res.should.be.json;
        res.should.have.status(400);
        done();
      });
  });

  it('should not accept empty membership field', (done) => {
    chai.request(Server)
      .post('/api/v1/users/signup/')
      .send({
        password: 'test',
        username: 'babadee',
        email: 'email@email.com',
        membership: '',
      })
      .end((err, res) => {
        res
          .body
          .message
          .should
          .equal('Membership is required, must be alphabet & not empty');
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
        res.should.be.json;
        res.body.message.should.equal('Invalid username or password');
        res.should.have.status(401);
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
  it('Rejects borrowing a book twice without returning', (done) => {
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

  it('Allows logged in users to edit username', (done) => {
    chai.request(Server)
      .put('/api/v1/users/edit/1')
      .set('xaccesstoken', userToken)
      .send({
        username: 'new'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.updated.username.should.equals('new');
        res.body.message.should.equal('profile updated succesfully');
        res.body.updated.username.should.equal('new');
        res.body.updated.should.have.property('password');
        res.body.updated.should.have.property('email');
        res.body.updated.should.have.property('membership');
        done();
      });
  });

  it('Catch error for invalid username on profile edit', (done) => {
    chai.request(Server)
      .put('/api/v1/users/edit/1')
      .set('xaccesstoken', userToken)
      .send({
        username: 'ne'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res
          .body
          .message
          .should
          .equal('New username should be at least 3 characters');
        done();
      });
  });

  it('Catches error for NAN user id supplied to edit username', (done) => {
    chai.request(Server)
      .put('/api/v1/users/edit/fsfggfsga')
      .set('xaccesstoken', userToken)
      .send({
        username: 'new'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('Invalid user id supplied!!!');
        done();
      });
  });

  it('Allows logged in users to edit password', (done) => {
    chai.request(Server)
      .put('/api/v1/users/edit/1')
      .set('xaccesstoken', userToken)
      .send({
        username: 'myusername',
        oldPassword: 'testpassworde',
        newPassword: 'newpassword'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('profile updated succesfully');
        res.body.updated.username.should.equal('myusername');
        res.body.updated.should.have.property('password');
        res.body.updated.should.have.property('email');
        res.body.updated.should.have.property('membership');
        done();
      });
  });

  it('Alerts for incorrect password on password change', (done) => {
    chai.request(Server)
      .put('/api/v1/users/edit/1')
      .set('xaccesstoken', userToken)
      .send({
        username: 'myusername',
        oldPassword: 'fake',
        newPassword: 'newpassword'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('Old password is incorrect');
        done();
      });
  });

  it('Rejects profile edit for none existing user ', (done) => {
    chai.request(Server)
      .put('/api/v1/users/edit/100')
      .set('xaccesstoken', userToken)
      .send({
        username: 'nonexisiting',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.equal('User not in database');
        done();
      });
  });

  it('Admin should be able to GET all users', (done) => {
    chai.request(Server)
      .get('/api/v1/users/')
      .set('xaccesstoken', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.users.should.be.a('array');
        res.body.users[0].should.have.property('password');
        res.body.users[0].should.have.property('email');
        res.body.users[0].should.have.property('membership');
        res.body.users[0].should.have.property('id');
        done();
      });
  });

  it('Non Admin should not be able to GET all users', (done) => {
    chai.request(Server)
      .get('/api/v1/users/')
      .set('xaccesstoken', userToken)
      .end((err, res) => {
        res.should.have.status(403);
        res
          .body
          .message
          .should
          .equals('Operation failed. Admin privileges needed.');
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

  it('Search for existing users by email', (done) => {
    chai.request(Server)
      .post('/api/v1/users/existing')
      .set('xaccesstoken', userToken)
      .send({
        searchTerm: 'test@user.co'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.a('object');
        res.body.message.email.should.equals('test@user.co');
        done();
      });
  });

  it('Search for existing users by username', (done) => {
    chai.request(Server)
      .post('/api/v1/users/checkuser')
      .set('xaccesstoken', userToken)
      .send({
        searchTerm: 'myusername'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.username.should.equals('myusername');
        done();
      });
  });

  it('Admin should be able to delete book', (done) => {
    chai.request(Server)
      .delete('/api/v1/books/1')
      .set('xaccesstoken', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equals('book deleted');
        res.body.id.should.equal('1');
        done();
      });
  });
});
