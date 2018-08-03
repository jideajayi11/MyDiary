import db from '../helpers/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
class Auth {

    static addUser (req, res, next) {

      db.result('select email from users where email = $1', req.body.email).
      then((data) => {

        if (!data.rowCount) {

          bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(req.body.password, salt, (err, hash) => {

              db.none(
              'insert into users(id, fullName, email, password, reminderTime)' +
               'values(DEFAULT, $1, $2, $3, $4)',
                            [
              req.body.fullName,
              req.body.email,
              hash,
              '7:00am'
              ]
              ).
              then(() => {

                db.one('select id from users where email = $1', req.body.email).
                then((data2) => {

                  const token = jwt.sign(
                  {email: req.body.email,
                  userId: data2.id},
                    process.env.JWT_KEY, {expiresIn: 86400}
                  );
                  localStorage.setItem('myDiaryToken', token);

                });
                res.status(201).
                  json({
                    status: 'success',
                    token,
                    message: 'User signup was successful'
                  });

}).
              catch((err) => {
              
              });

});

});

} else {

          res.status(403).
          json({
            status: 'error',
            message: 'Email already exist'
          });

}

});

    }


    static authUsers (req, res) {

      db.any('select * from users').
      then((data) => {

      const user = data.filter((item) => item.email === req.body.email);
      if (user.length) {

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {

          if (result) {

            const userId = user[0].id;
            const token = jwt.sign(
            {email: req.body.email,
            userId},
              process.env.JWT_KEY, {expiresIn: 86400}
);
            localStorage.setItem('myDiaryToken', token);

            return res.status(200).json({
              status: 'success',
              token,
              message: 'You are now logged in'
            });

          }

            return res.status(404).json({
              status: 'error',
              message: 'Authentication failed. Invalid password.'
            });

        });

        } else {

                return res.status(404).json({
                  status: 'error',
                  message: 'Authentication failed. User not found.'
                });

        }

});

}

}
export default Auth;