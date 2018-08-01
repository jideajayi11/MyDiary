import db from '../db';

class Entry {

  static getEntries (req, res, next) {
    db.any('select * from entries where userid=$1', req.params.userid)
    .then(function (data) {
      if (data.length) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Fetched all Entries for a User'
          });
      }else {
        res.status(404)
          .json({
            status: 404,
            message: 'No Entry Found'
          });
      }
    })
    .catch(function (err) {
      return next(err);
    });
  }
  
  /*
  static getEntries (req, res) {

    if (entryModel.length < 1) {

      return res.status(404).json({
        error: 404,
        message: 'Entry not found'
      });

} else if (entryModel.length >= 1) {

      return res.status(200).json({
        entryModel
      });

}

return res.status(400).json({
      error: 400,
      message: 'Bad request'
    });

  }*/

static getEntry (req, res, next) {
  db.one('select * from entries where id = $1 AND userid = $2', [req.params.id, req.params.userid])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Fetched An Entry'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/*
static getEntry (req, res) {

  const entry = entryModel.
  filter((item) => item.id.toString() === req.params.id);
  if (entry.length > 0) {

    return res.status(200).json({
      entry
    });

}

return res.status(404).json({
    error: 404,
    message: 'Entry id not found'
  });

}*/
/*
static addEntry (req, res) {

  if (!(req.body.title) || !(req.body.content)) {

    return res.status(400).json({
      error: 400,
      message: 'Incomplete parameters'
    });

}
  const lastId = entryModel[entryModel.length - 1].id;
  const id = parseInt(lastId, 10) + 1;
  const dateAdded = Date.now();
  entryModel.push({
    content: req.body.content,
    dateAdded,
    id,
    title: req.body.title
  });

return res.status(201).json({
  entryModel,
    message: 'new entry added'
  });

}*/

static addEntry (req, res, next) {
  db.none('insert into entries(id, content, title, userId)' +
      'values(DEFAULT, ${content}, ${title}, ${userId})',
    req.body)
    .then(function () {
      res.status(201)
        .json({
          status: 'success',
          message: 'Inserted one entry'
        });
    })
    .catch(function (err) {
      return next(err);
    });

}


static updateEntry (req, res, next) {
  db.none('update entries set content=$1 ' +
    'where id=$2 AND userid=$3', [req.body.content, req.params.id, req.params.userid])
    .then(function () {
      res.status(200)
      .json({
        status: 'success',
        message: 'Updated content'
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

static deleteEntry (req, res, next) {
  db.result('delete from entries where id = $1 AND userid = $2',
    [req.params.id, req.params.userid])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Deleted '+data.rowCount+' entry'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


/*
static deleteEntry (req, res) {

 //const entry = entryModel.
 //filter((item) => item.id === parseInt(req.params.id, 10));
 
  const index = entryModel.
  findIndex((item) => item.id === parseInt(req.params.id, 10));
  if (index >= 0) {

    entryModel.splice(index, 1);

return res.status(200).json({
  entryModel,
      message: 'Entry was deleted'
    });

}

return res.status(404).json({
    error: 404,
    message: 'Entry not found'
  });

}*/

}
export default Entry;




//https://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/