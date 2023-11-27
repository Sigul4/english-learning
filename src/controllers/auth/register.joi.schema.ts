import Joi from 'joi';

export const registerValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.any': 'Invalid email',
    'any.required': 'Please fill the email',
  }),
  first_name: Joi.string().required().messages({
    'string.any': 'Invalid first_name',
    'any.required': 'Please fill the first_name',
  }),
  last_name: Joi.string().required().messages({
    'string.any': 'Invalid last_name',
    'any.required': 'Please fill the last_name',
  }),
  login: Joi.string().required().messages({
    'string.any': 'Invalid login',
    'any.required': 'Please fill the login',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Please fill the password',
    'string.pattern.base': 'Invalid password',
  }),
});
