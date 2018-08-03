// https://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/

import db from '../helpers/db';

class Entry {

  static getEntries (req, res, next) {

    db.any('select * from entries where userid=$1', req.decoded.userId).
    then((data) => {
      if(data.length) {
        res.status(200).
        json({
          status: 'success',
          data,
          message: 'These are all your entries'
        });
      }else {
        res.status(200).
        json({
          status: 'success',
          message: 'You do not have any entry yet'
        });
      }
}).
    catch((err) => {
     
    });

}

static getEntry (req, res, next) {

  db.one('select * from entries where id = $1 AND userid = $2', [
req.params.id,
req.decoded.userId
]).
    then((data) => {
      if(data.length) {
        res.status(200).
        json({
          status: 'success',
          data,
          message: 'Your Entry was found'
        });
      }else {
        res.status(404).
        json({
          status: 'error',
          message: 'The Entry you are looking for, does not exist'
        });
      }
      

}).
    catch((err) => {
      
    });

}


static addEntry (req, res, next) {

  db.none(
'insert into entries(id, content, title, userId)' +
      'values(DEFAULT, ${content}, ${title}, ${userId})',
    req.body
).
    then(() => {

      res.status(201).
        json({
          status: 'success',
          message: 'Your Entry was successfully added'
        });

}).
    catch((err) => {
      
    });

}


static updateEntry (req, res, next) {

  db.none('update entries set content=$1 ' +
    'where id=$2 AND userid=$3', [
req.body.content,
req.params.id,
req.decoded.userId
]).
    then(() => {

      res.status(200).
      json({
        status: 'success',
        message: 'Your Entry content was successfully updated'
      });

}).
    catch((err) => {
      
    });

}

static deleteEntry (req, res, next) {

  db.result(
'delete from entries where id = $1 AND userid = $2',
    [
req.params.id,
req.decoded.userId
]
).
    then((data) => {

      res.status(200).
        json({
          status: 'success',
          message: `The Entry has been deleted`
        });

}).
    catch((err) => {
      
    });

}

}
export default Entry;