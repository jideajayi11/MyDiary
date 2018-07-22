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

});