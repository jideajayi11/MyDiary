import {expect} from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../bin/www';
import jwt from 'jsonwebtoken';

const should = chai.should();
chai.use(chaiHttp);
const token = jwt.sign(
{email: 'jide11@gmail.com',
userId: 1},
process.env.JWT_KEY, {expiresIn: 86400}
);
describe('GET Time', () => {

    it('should GET the reminder time', (done) => {

      chai.request(server).
        get('/api/v1/reminder/1').
        set('x-access-token', token).
        end((err, res) => {

          res.should.have.status(200);
          res.body.should.be.a('object');
          expect(res.body).to.have.property('status').equal('success');
          expect(res.body).to.have.property('message').equal('This is your current reminder time');
          res.body.time.should.have.property('remindertime').equal('07:00:00');
          done();

  });

  });

  });

describe('UPDATE Time', () => {

    it('should Update the reminder time', (done) => {

      chai.request(server).
        put('/api/v1/reminder/1').
        set('x-access-token', token).
        send({
          remindertime: '07:00:00'
        }).
        end((err, res) => {

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').equal('success');
          res.body.should.have.property('message').equal('New Reminder Time was set');
          done();

  });

  });

  });

  describe('UPDATE User', () => {

    it('should Update the user full name', (done) => {

      chai.request(server).
        put('/api/v1/updateUsers/1').
        set('x-access-token', token).
        send({
          fullName: 'Jide Unl'
        }).
        end((err, res) => {

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').equal('success');
          res.body.should.have.property('message').equal('Your name was successfully updated');
          done();

  });

  });

  });
