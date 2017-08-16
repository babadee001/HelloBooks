import chai from 'chai';
import chaiHttp from 'chai-http';
import Server from '../server';
// import Users from '../server/models';

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
});

/**
describe('/GET ', () => {
  it('it should GET a welcome message', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Welcome!!!!');
        done();
      });
  });
});
**/
