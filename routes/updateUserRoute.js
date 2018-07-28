import Auth from '../controller/authController';
import SchemaValidator from '../validator/middleware';

const validateRequest = SchemaValidator(true);

export default (app) => {
  app.put('/api/v1/auth/updateUsers/:id', validateRequest, Auth.updateUsers);

};