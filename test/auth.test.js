import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../bin/www';

const should = chai.should();
chai.use(chaiHttp);

describe('Signup a User', () => {

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
  describe('Signin a User', () => {

    it('should authenticate a User', (done) => {
  
      chai.request(server).
        post('/api/v1/auth/login').
        send({
          email: 'segunadams@gmail.com',
          password: 'qwerty'
        }).
        end((err, res) => {
  
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
  
  });
  
  });
  it('should return Email not found', 
  (done) => {
  
    chai.request(server).
      post('/api/v1/auth/login').
      send({
        email: '',
        password: 'qwerty'
      }).
      end((err, res) => {
  
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error').equal(404);
        res.body.should.have.property('message').equal('Authentication failed. User not found.');
        done();
  
  });
  
  });
  it('should return Invalid password', 
  (done) => {
  
    chai.request(server).
      post('/api/v1/auth/login').
      send({
        email: 'segunadams@gmail.com',
        password: ''
      }).
      end((err, res) => {
  
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error').equal(404);
        res.body.should.have.property('message').equal('Authentication failed. Invalid password.');
        done();
  
  });
  
  });
  
  });