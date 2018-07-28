import promise from "bluebird";

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
const db = pgp('postgres://rovcdyoj:J91nTzpkuI7hO7PxH0qR3TjGMT0PZEwF@pellefant.db.elephantsql.com:5432/rovcdyoj');
export default db;