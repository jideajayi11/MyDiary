import db from '../helpers/db';

class User {

    static getTime (req, res, next) {

      db.one('select remindertime from users where id = $1', [req.params.id]).
      then((time) => {

        res.status(200).
          json({
            status: 'success',
            time,
            message: 'This is your current reminder time'
          });

}).
      catch((err) => {
        
      });

}

    static setTime (req, res, next) {

      db.none('update users set reminderTime=$1 ' +
      'where id=$2', [
      req.body.remindertime,
      req.params.id
      ]).
      then(() => {

        res.status(200).
        json({
          status: 'success',
          message: 'New Reminder Time was set'
        });

}).
      catch((err) => {
     
      });

}

    static updateUsers (req, res, next) {

      db.none('update users set fullName=$1 ' +
        'where id=$2', [
      req.body.fullName,
      req.params.id
      ]).
        then(() => {

          res.status(200).
          json({
            status: 'success',
            message: 'Your name you successfully updated'
          });

}).
        catch((err) => {
          
        });

}

}
export default User;