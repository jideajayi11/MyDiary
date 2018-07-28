import Auth from '../controller/authController';

export default (app) => {

  app.post('/api/v1/auth/signup', Auth.addUser);
  //app.get('/api/v1/auth/users', Auth.getUsers);
  app.post('/api/v1/auth/login', Auth.authUsers);
  app.put('/api/v1/auth/updateUsers/:id', Auth.updateUsers);

};