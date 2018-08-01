import Joi from 'joi';

const newEntry = Joi.object().keys({
  content: Joi.string().required(),
  title: Joi.string().required(),
  userId: Joi.number().integer().required()
});
const updateEntry = Joi.object().keys({
  content: Joi.string().required()
});
const newUser = Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required().strict(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
});
const login = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required().strict()
});
const updateUser = Joi.object().keys({
  fullName: Joi.string().required()
});
const updateTime = Joi.object().keys({
  remindertime: Joi.required()
});

export default {
  '/api/v1/entry': newEntry,
  '/api/v1/entry/:userid/:id': updateEntry,
  '/api/v1/auth/signup': newUser,
  '/api/v1/auth/updateUsers/:id': updateUser,
  '/api/v1/reminder/:id': updateTime,
  '/api/v1/auth/login': login,
};



//https://scotch.io/amp/tutorials/node-api-schema-validation-with-joi