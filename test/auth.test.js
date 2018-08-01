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
          email: 'jide11@gmail.com',
          fullName: 'jide Dee',
          password: 'seekvalues',
          confirmPassword: 'seekvalues'
        }).
        end((err, res) => {
  
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').equal('success');
          res.body.should.have.property('message').equal('Inserted one user');
          done();
  
  });
  
  });
  it('should return Email exists', 
  (done) => {
  
    chai.request(server).
      post('/api/v1/auth/signup').
      send({
        email: 'jide11@gmail.com',
        fullName: 'jide Dee',
        password: 'seekvalues',
        confirmPassword: 'seekvalues'
      }).
      end((err, res) => {
  
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('error');
        res.body.should.have.property('message').equal('Email already exist');
        done();
  
  });
  
  });
  
  });
  describe('Signin a User', () => {

    it('should authenticate a User', (done) => {
  
      chai.request(server).
        post('/api/v1/auth/login').
        send({
          email: 'jide11@gmail.com',
          password: 'seekvalues'
        }).
        end((err, res) => {
  
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').equal('success');          
          res.body.should.have.property('message').equal('Logged in');          
          done();
  
  });
  
  });
  it('should return Email not found', 
  (done) => {
  
    chai.request(server).
      post('/api/v1/auth/login').
      send({
        email: 'jide1234@gmail.com',
        password: 'seekvalues'
      }).
      end((err, res) => {
  
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('error');
        res.body.should.have.property('message').equal('Authentication failed. User not found.');
        done();
  
  });
  
  });
  it('should return Invalid password', 
  (done) => {
  
    chai.request(server).
      post('/api/v1/auth/login').
      send({
        email: 'jide11@gmail.com',
        password: 'qwerty'
      }).
      end((err, res) => {
  
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('error');
        res.body.should.have.property('message').equal('Authentication failed. Invalid password.');
        done();
  
  });
  
  });
  
  });