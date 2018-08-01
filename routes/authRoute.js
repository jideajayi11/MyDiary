import Auth from '../controller/authController';
import SchemaValidator from '../validator/middleware';

const validateRequest = SchemaValidator(true);
export default (app) => {

  app.post('/api/v1/auth/signup', validateRequest, Auth.addUser);
  // App.get('/api/v1/auth/users', Auth.getUsers);
  app.post('/api/v1/auth/login', validateRequest, Auth.authUsers);

};