const entrySQL = `CREATE TABLE entries (
    id SERIAL NOT NULL,
    title varchar NOT NULL,
    content varchar NOT NULL,
    dateAdded varchar NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userId int NOT NULL
  );`;
  const userSQL = `CREATE TABLE users (
    id SERIAL NOT NULL,
    fullName varchar NOT NULL,
    email varchar NOT NULL,
    password varchar NOT NULL,
    dateAdded varchar NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reminderTime time NOT NULL
  );`;
  const mydiarySQL = `${entrySQL} ${userSQL}`;

  export default mydiarySQL;