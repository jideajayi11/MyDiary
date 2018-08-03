import User from '../controller/userController';
import SchemaValidator from '../helpers/validator/middleware';

const validateRequest = SchemaValidator(true);
export default (app) => {

  app.get('/api/v1/reminder/:id', User.getTime);
  app.put('/api/v1/reminder/:id', validateRequest, User.setTime);
  app.put('/api/v1/updateUsers/:id', validateRequest, User.updateUsers);

};