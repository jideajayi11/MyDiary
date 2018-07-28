import userModel from '../model/userModel';
import db from '../db';

class Time {
    /*
    static getTime (req, res) {

        const id = parseInt(req.params.id, 10);
        const user = userModel.filter((item) => item.id === id);
        if (user.length > 0) {

          return res.status(200).json({
            user
          });

    }

          return res.status(404).json({
            error: 404,
            message: 'User id not found'
          });

    }*/

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
        return next(err);
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
        return next(err);
      });
    }
}
export default Time;