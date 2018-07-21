import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../bin/www';

const should = chai.should();
chai.use(chaiHttp);


describe('UPDATE Time', () => {

    it('should Update the reminder time', (done) => {
  
      chai.request(server).
        put('/api/v1/reminder/1').
        send({
          reminderTime: '07:00 am'
        }).
        end((err, res) => {
  
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
  
  });
  
  });
  
  });