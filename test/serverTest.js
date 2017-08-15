import supertest from 'supertest';
import chai from 'chai';
import mocha from 'mocha';
import app from '../server';
import models from '../server/models/';
import seeder from '../server/seeders/index';

const server = supertest.agent(app);
const should = chai.should();


before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('User Registration', () => {
  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(seeder.signUp)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Signed up successfully');
        done();
      });
  });

  it('Checks for existing username', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(seeder.existingUsername)
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Username or email already exists');
        done();
      });
  });

  it('Logs the user in successfully', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(seeder.login)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Log in successful');
        done();
      });
  });
});