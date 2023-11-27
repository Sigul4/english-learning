import Joi from 'joi';

export const authValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.any': 'Invalid email',
    'any.required': 'Please fill the email',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Please fill the password',
    'string.pattern.base': 'Invalid password',
  }),
});
