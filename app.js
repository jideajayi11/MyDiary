import bodyParser from 'body-parser';
import entryRoute from './routes/entryRoute';
import express from 'express';
import logger from 'morgan';
import timeSettingRoute from './routes/timeSettingRoute';
import authRoute from './routes/authRoute';
import updateUserRoute from './routes/updateUserRoute';
import createTable from './db/createTable';
import config from './config';
import jwt from 'jsonwebtoken';



const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => res.status(200).send({
  message: 'MyDiary is an online journal where ' +
  'users can pen down their thoughts and feelings.'
}));
authRoute(app);

//Authenticate routes after this function

app.use(function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.mySecret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });
  }else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

updateUserRoute(app);
entryRoute(app);
timeSettingRoute(app);
//createTable();
export default app;





//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens