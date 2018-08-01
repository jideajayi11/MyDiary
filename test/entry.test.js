import chai from 'chai';
import {expect} from 'chai';
import chaiHttp from 'chai-http';
import server from '../bin/www';
import jwt from 'jsonwebtoken';
import config from '../config';

const should = chai.should();
chai.use(chaiHttp);
const token = jwt.sign({email: 'jide@ajayi.co'}, 
  config.mySecret, {expiresIn: 86400});

describe('GET all Entries', () => {

  it('should Get all Entries', (done) => {

    chai.request(server).
      get('/api/v1/entries/6').
      set('x-access-token', token).
      end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message').equal('Fetched all Entries for a User');
        expect(res.body.data[0]).to.have.property('id').equal(1);
        expect(res.body.data[0]).to.have.property('userid').equal(6);
        expect(res.body.data[0]).to.have.property('title').equal('Epic');
        expect(res.body.data[0]).to.have.property('content').equal('Show me a man who thinks he ' +
        'does not need to keep adding values to himself and I will show you an unwise man');
        expect(res.body.data[0]).to.have.property('dateadded').equal('2018-07-27 18:56:20.571774+00');
        done();
});

});
it('should Get all Entries', (done) => {

  chai.request(server).
    get('/api/v1/entries/0').
    set('x-access-token', token).
    end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('status').equal(404);
      expect(res.body).to.have.property('message').equal('No Entry Found');
      done();
});

});

});

describe('GET an Entry', () => {

  it('should GET a particular Entry given its id', (done) => {

    chai.request(server).
      get('/api/v1/entry/6/1').
      set('x-access-token', token).
      end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message').equal('Fetched An Entry');
        expect(res.body.data).to.have.property('id').equal(1);
        expect(res.body.data).to.have.property('userid').equal(6);
        expect(res.body.data).to.have.property('title').equal('Epic');
        expect(res.body.data).to.have.property('content').equal('Show me a man who thinks he ' +
        'does not need to keep adding values to himself and I will show you an unwise man');
        expect(res.body.data).to.have.property('dateadded');
        done();

});

});

it('should not allow GET due to wrong token', (done) => {

  chai.request(server).
    get('/api/v1/entry/6/1').
    set('x-access-token', 'token').
    end((err, res) => {
      expect(res.body).to.have.property('success').equal(false);
      expect(res.body).to.have.property('message').equal('Failed to authenticate token.');
      done();
});

});


it('should not allow GET due to no token', (done) => {

  chai.request(server).
    get('/api/v1/entry/6/1').
    end((err, res) => {
      expect(res.status).to.equal(403);      
      expect(res.body).to.have.property('success').equal(false);
      expect(res.body).to.have.property('message').equal('No token provided.');
      done();
});

});

});
describe('POST an Entry', () => {

  it('should add a new Entry', (done) => {

    chai.request(server).
      post('/api/v1/entry').
      set('x-access-token', token).
      send({
        content: 'Show me a man who thinks he does not need to keep ' +
        'adding values to himself and I will show you an unwise man',
        title: 'seek values',
        userId: 6
      }).
      end((err, res) => {

        res.should.have.status(201);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message').equal('Inserted one entry');
        done();
});

});

});
describe('UPDATE an Entry', () => {

  it('should Update an Entry', (done) => {

    chai.request(server).
      put('/api/v1/entry/6/1').
      set('x-access-token', token).
      send({
        content: 'Show me a man who thinks he does not need to keep ' +
        'adding values to himself and I will show you an unwise man'
      }).
      end((err, res) => {

        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message').equal('Updated content');
        done();

});

});

});
describe('DELETE an Entry', () => {

  it('should Delete an Entry', (done) => {

    chai.request(server).
      delete('/api/v1/entry/6/4').
      set('x-access-token', token).
      end((err, res) => {

        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.property('message').equal('Deleted 1 entry');
        done();

});

});
it('should return Not Found when id=0', (done) => {

  chai.request(server).
  delete('/api/v1/entry/0').
    end((err, res) => {

      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('error').equal(404);
      res.body.should.have.property('message').equal('Entry not found');
      done();

});

});

});
