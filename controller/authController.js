import db from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

class Auth{

    static addUser (req, res, next) {
      db.result('select email from users where email = $1', req.body.email)
      .then(function (data) {
        if(!data.rowCount) {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
              db.none('insert into users(id, fullName, email, password, reminderTime)' +
            'values(DEFAULT, $1, $2, $3, $4)',
              [req.body.fullName, req.body.email, hash, '7:00am'])
              .then(function () {
                db.one('select id from users where email = $1', req.body.email)
                .then(function (data2) {
                  const token = jwt.sign({email: req.body.email, userId: data2.id}, 
                    process.env.JWT_KEY, {expiresIn: 86400});
                  localStorage.setItem('myDiaryToken', token);
                });
                
               // res.header('x-auth-token', token).status(201)
                res.status(201)
                  .json({
                    status: 'success',
                    message: 'Inserted one user'
                  });
              })
              .catch(function (err) {
                //return next(err);
              });
            });
          });
        }else {
          res.status(403)
          .json({
            status: 'error',
            message: 'Email already exist'
          });
        }
      });
      
    }

    
    static authUsers (req, res) {
      db.any('select * from users')
      .then(function (data) {
      const user = data.filter((item) => item.email === req.body.email);
      if (user.length) {
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
          if(result) {
            const userId = user[0].id;
            const token = jwt.sign({email: req.body.email, userId: userId}, 
              process.env.JWT_KEY, {expiresIn: 86400});
            localStorage.setItem('myDiaryToken', token);
            return res.status(200).json({
              status: 'success',
              message: 'Logged in'
            });
            
          }else {
            return res.status(404).json({ 
              status: 'error',
              message: 'Authentication failed. Invalid password.' 
            });
          }
        });
      }else {
        return res.status(404).json({ 
          status: 'error',
          message: 'Authentication failed. User not found.' 
        });
      }
    });
    }

}
export default Auth;