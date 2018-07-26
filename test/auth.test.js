import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../bin/www';

const should = chai.should();
chai.use(chaiHttp);

describe('POST a User', () => {

    it('should add a new User', (done) => {
  
      chai.request(server).
        post('/api/v1/auth/signup').
        send({
          email: 'jide@gmail.com',
          fullName: 'jide Dee',
          password: 'seekvalues'
        }).
        end((err, res) => {
  
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
  
  });
  
  });
  it('should return Bad Request when nothing is passed to body', 
  (done) => {
  
    chai.request(server).
      post('/api/v1/auth/signup').
      end((err, res) => {
  
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').equal(400);
        res.body.should.have.property('message').equal('Incomplete parameters');
        done();
  
  });
  
  });
  
  });