import db from '../db';
import jwt from 'jsonwebtoken';


class Auth{

  /*
    static addUser (req, res) {
      if (!(req.body.email) || !(req.body.fullName) || !(req.body.password)) {
        return res.status(400).json({
          error: 400,
          message: 'Incomplete parameters'
        });
      }
      const lastId = userModel[userModel.length - 1].id;
      //const id = parseInt(lastId, 10) + 1;
      const dateAdded = Date.now();
      userModel.push({
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
        dateAdded,
        id: parseInt(lastId, 10) + 1,
        reminderTime: '07:00 am'
      });
      return res.status(201).json({
        userModel,
        message: 'new user added'
      });
    }*/

    static addUser (req, res, next) {
      db.none('insert into users(id, fullName, email, password, reminderTime)' +
        'values(DEFAULT, ${fullName}, ${email}, ${password}, "7:00am")',
      req.body)
      .then(function () {
        res.status(201)
          .json({
            status: 'success',
            message: 'Inserted one user'
          });
      })
      .catch(function (err) {
        return next(err);
      });
    }

    /*
    static getUsers (req, res, next) {
      db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Fetched All Users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
    }
    */
    
    static authUsers (req, res) {
      db.any('select * from users')
      .then(function (data) {
      const user = data.filter((item) => item.email === req.body.email);
      if (user.length) {
        if(user[0].password === req.body.password) {
          const token = jwt.sign({email: req.body.email}, 
            'superSecret');
          return res.status(200).json({
            user,
            token,
            message: 'Logged in'
          });
          
        }else {
          return res.status(404).json({ 
            error: 404, 
            message: 'Authentication failed. Invalid password.' 
          });
        }
        
      }else {
        return res.status(404).json({ 
          error: 404, 
          message: 'Authentication failed. User not found.' 
        });
      }
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
          return next(err);
        });
    }
}
export default Auth;