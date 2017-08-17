import chai from 'chai';
import chaiHttp from 'chai-http';
import Server from '../server';
import models from '../server/models';

process.env.NODE_ENV = 'test';
const should = chai.should();

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
        res.text.should.equal('Welcome to Hello-Books API');
        done();
      });
  });
  it('it should GET a welcome message', (done) => {
    chai.request(Server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal('Welcome!!!!');
        done();
      });
  });
  it('POST /api/v1/users/signup/ does create new user', (done) => {
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
        res.should.have.status(409);
        done();
      });
  });
});
