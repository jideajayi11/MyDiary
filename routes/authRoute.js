import Auth from '../controller/authController';

export default (app) => {

  app.post('/api/v1/auth/signup', Auth.addUser);
  app.post('/api/v1/auth/login', Auth.authUsers);

};