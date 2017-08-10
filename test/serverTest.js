import chai from 'chai';
import chaiHttp from 'chai-http';
import Server from '../server';

const should = chai.should();

chai.use(chaiHttp);


describe('Test', () => {
  it('should access api end point', (done) => {
    chai.request(Server)
      .get('/api')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should not get access to all books without a token', (done) => {
    chai.request(Server)
      .get('/api/v1/books')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  /**it('should signup users', (done) => {
    chai.request(Server)
      .get('signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ username: 'test', password: 'testpassword', email: 'testemail' })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });**/
});
