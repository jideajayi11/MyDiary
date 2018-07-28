import db from './';
import sql from './createTable';

export default (req, res, next) => {
  db.none(sql).
  then(function () {
    res.status(200)
      .json({
        status: 'success'
      });
  })
  .catch(function (err) {
    //return next(err);
  });

};