import promise from "bluebird";
import config from '../config';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);

let db;
if(process.env.NODE_ENV === 'test') {
  db = pgp(process.env.DB_PATH_TEST);
}else {
  db = pgp(process.env.DB_PATH);
}
export default db;