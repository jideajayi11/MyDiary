import Time from '../controller/timeSettingController';

export default (app) => {

  app.get('/api/v1/reminder/:id', Time.getTime);
  app.put('/api/v1/reminder/:id', Time.setTime);

};