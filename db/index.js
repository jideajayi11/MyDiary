import promise from "bluebird";
import config from '../config';

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
/*const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'mydiary',
  user: 'postgres',
  password: 'root'
});*/
const db = pgp(config.db);
export default db;