import bodyParser from 'body-parser';
import entryRoute from './routes/entryRoute';
import express from 'express';
import logger from 'morgan';
import timeSettingRoute from './routes/timeSettingRoute';
import authRoute from './routes/authRoute';
import createTable from './db/createTable';


const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

entryRoute(app);
timeSettingRoute(app);
authRoute(app);
//createTable();

app.get('/', (req, res) => res.status(200).send({
  message: 'MyDiary is an online journal where ' +
  'users can pen down their thoughts and feelings.'
}));

export default app;