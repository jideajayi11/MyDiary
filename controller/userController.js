import db from '../db';

class User {

    static getTime (req, res, next) {
      db.one('select remindertime from users where id = $1', [req.params.id])
      .then(function (time) {
        res.status(200)
          .json({
            status: 'success',
            time,
            message: 'Get Time'
          });
      })
      .catch(function (err) {
        //return next(err);
      });
    }

    static setTime (req, res, next) {
      db.none('update users set reminderTime=$1 ' +
      'where id=$2', [req.body.remindertime, req.params.id])
      .then(function () {
        res.status(200)
        .json({
          status: 'success',
          message: 'Updated Reminder Time'
        });
      })
      .catch(function (err) {
        //return next(err);
      });
    }

    static updateUsers (req, res, next) {
      db.none('update users set fullName=$1 ' +
        'where id=$2', [req.body.fullName, req.params.id])
        .then(function () {
          res.status(200)
          .json({
            status: 'success',
            message: 'Updated Full Name'
          });
        })
        .catch(function (err) {
          //return next(err);
        });
    }
}
export default User;