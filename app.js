import bodyParser from 'body-parser';
import entryRoute from './routes/entryRoute';
import express from 'express';
import logger from 'morgan';
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';
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

// Authenticate routes after this function

app.use((req, res, next) => {

  const token = req.headers['x-access-token'] || req.body.token || req.query.token;
  if (token) {

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {

      if (err) {

        return res.json({success: false,
message: 'Failed to authenticate token.'});

}
        // If everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();

    });

} else {

    /*
     * If there is no token
     * return an error
     */
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }

});

entryRoute(app);
userRoute(app);

export default app;


// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens