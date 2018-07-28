import Entry from '../controller/entryController';

export default (app) => {

  app.get('/api/v1/entries/:userid', Entry.getEntries);
  app.get('/api/v1/entry/:userid/:id', Entry.getEntry);
  app.post('/api/v1/entry', Entry.addEntry);
  app.put('/api/v1/entry/:userid/:id', Entry.updateEntry);
  app.delete('/api/v1/entry/:userid/:id', Entry.deleteEntry);

};