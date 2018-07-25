import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../bin/www';

const should = chai.should();
chai.use(chaiHttp);

describe('GET all Entries', () => {

  it('should Get all Entries', (done) => {

    chai.request(server).
      get('/api/v1/entries').
      end((err, res) => {

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.entryModel[0].should.have.property('id').equal(1);
        res.body.entryModel[0].should.have.property('title').equal('The Dragons');
        res.body.entryModel[0].should.have.property('dateAdded').equal('2018-07-20');
        res.body.entryModel[0].should.have.
        property('content').equal('I went to the cinema to see - The Dragons, I was ' +
        'really awesome and I enjoyed myself. I think I ' +
        'should create more time to see the movies.');
        done();

});

});

});
describe('GET an Entry', () => {

  it('should GET a particular Entry given its id', (done) => {

    chai.request(server).
      get('/api/v1/entry/1').
      end((err, res) => {

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.entry[0].should.have.property('id').equal(1);
        res.body.entry[0].should.have.property('title').equal('The Dragons');
        res.body.entry[0].should.have.property('dateAdded').equal('2018-07-20');
        res.body.entry[0].should.have.
        property('content').equal('I went to the cinema to see - The Dragons, I was ' +
        'really awesome and I enjoyed myself. I think I ' +
        'should create more time to see the movies.');
        done();

});

});
it('should return Not Found when id=0', (done) => {

  chai.request(server).
    get('/api/v1/entry/0').
    end((err, res) => {

      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('error').equal(404);
      res.body.should.have.property('message').equal('Entry id not found');
      done();

});

});

});
describe('POST an Entry', () => {

  it('should add a new Entry', (done) => {

    chai.request(server).
      post('/api/v1/entry').
      send({
        content: 'Show me a man who thinks he does not need to keep ' +
        'adding values to himself and I will show you an unwise man',
        title: 'seek values'
      }).
      end((err, res) => {

        res.should.have.status(201);
        res.body.should.be.a('object');
        done();

});

});
it('should return Bad Request when only Content is passed to body', 
(done) => {

  chai.request(server).
    post('/api/v1/entry').
    send({
      content: 'Show me a man who thinks he does not need to keep ' +
      'adding values to himself and I will show you an unwise man'
    }).
    end((err, res) => {

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error').equal(400);
      res.body.should.have.property('message').equal('Incomplete parameters');
      done();

});

});
it('should return Bad Request when only Title is passed to body', 
(done) => {

  chai.request(server).
    post('/api/v1/entry').
    send({
      title: 'seek values'
    }).
    end((err, res) => {

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error').equal(400);
      res.body.should.have.property('message').equal('Incomplete parameters');
      done();

});

});
it('should return Bad Request when Nothing is passed to body', 
(done) => {

  chai.request(server).
    post('/api/v1/entry').
    end((err, res) => {

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error').equal(400);
      res.body.should.have.property('message').equal('Incomplete parameters');
      done();

});

});

});
describe('UPDATE an Entry', () => {

  it('should Update an Entry', (done) => {

    chai.request(server).
      put('/api/v1/entry/1').
      send({
        content: 'I went to the cinema at Maryland to see - The Dragons, ' +
        'I was really awesome and I enjoyed myself. I think I should ' +
        'create more time to see the movies.',
        title: 'cinema'
      }).
      end((err, res) => {

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.entryModel[0].should.have.property('id').equal(1);
        res.body.entryModel[0].should.have.property('title').equal('cinema');
        res.body.entryModel[0].should.have.property('dateAdded').equal('2018-07-20');
        res.body.entryModel[0].should.have.
        property('content').equal('I went to the cinema at Maryland to see - The Dragons, ' +
        'I was really awesome and I enjoyed myself. I think I should ' +
        'create more time to see the movies.');
        res.body.should.have.property('message').equal('Entry updated');
        
        done();

});

});
it('should return Not Found when id=0', (done) => {

  chai.request(server).
    put('/api/v1/entry/0').
    end((err, res) => {

      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('error').equal(404);
      res.body.should.have.property('message').equal('Entry not found');
      done();

});

});

});
describe('DELETE an Entry', () => {

  it('should Delete an Entry', (done) => {

    chai.request(server).
      delete('/api/v1/entry/1').
      end((err, res) => {

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal('Entry was deleted');
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