import Entry from '../controller/entryController';
import SchemaValidator from '../validator/middleware';

const validateRequest = SchemaValidator(true);

export default (app) => {

  app.get('/api/v1/entries', Entry.getEntries);
  app.get('/api/v1/entry/:id', Entry.getEntry);
  app.post('/api/v1/entry', validateRequest, Entry.addEntry);
  app.put('/api/v1/entry/:id', validateRequest, Entry.updateEntry);
  app.delete('/api/v1/entry/:id', Entry.deleteEntry);

};