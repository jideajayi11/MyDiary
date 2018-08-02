import promise from 'bluebird';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);

let db;
if (process.env.NODE_ENV === 'test') {

  db = pgp(process.env.DB_PATH_TEST);
  // Console.log(process.env.NODE_ENV, 'NODE_ENV1');

} else {

  db = pgp(process.env.DB_PATH);
  // Console.log(process.env.NODE_ENV, 'NODE_ENV2');

}


export default db;
