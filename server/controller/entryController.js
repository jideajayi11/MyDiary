import db from '../helpers/db';

class Entry {

  static getEntries (req, res, next) {

    db.any('select * from entries where userid=$1', req.decoded.userId).
    then((data) => {

      res.status(200).
        json({
          status: 'success',
          data,
          message: 'Fetched all Entries for a User'
        });

}).
    catch((err) => {
      // Return next(err);
    });

}

static getEntry (req, res, next) {

  db.one('select * from entries where id = $1 AND userid = $2', [
req.params.id,
req.decoded.userId
]).
    then((data) => {

      res.status(200).
        json({
          status: 'success',
          data,
          message: 'Fetched An Entry'
        });

}).
    catch((err) => {
      // Return next(err);
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
          message: 'Inserted one entry'
        });

}).
    catch((err) => {
      // Return next(err);
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
        message: 'Updated content'
      });

}).
    catch((err) => {
      // Return next(err);
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
          message: `Deleted ${data.rowCount} entry`
        });

}).
    catch((err) => {
      // Return next(err);
    });

}

}
export default Entry;


// https://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/