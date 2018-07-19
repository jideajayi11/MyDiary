import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import entryRoute from './routes/entryRoute';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

entryRoute(app);

app.get('/', (req, res) => res.status(200).send({
  message: 'MyDiary is an online journal where users can pen down their thoughts and feelings.'
}));

export default app;