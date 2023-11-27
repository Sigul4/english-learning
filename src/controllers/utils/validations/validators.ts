import Joi from 'joi';
import { Request } from 'express';

interface ValidationMessage<T> {
  error?: string;
  data: T;
}

export function validateRequest<T>(req: Request, requestField: keyof Request, validator: Joi.Schema): ValidationMessage<T> {
  const data = req[requestField] as T;
  const result = validator.validate(data);

  const details = result.error?.details ?? [];

  if (details.length) {
    return { error: details[0].message, data };
  }

  return { data };
}

export function validateQueries<T>(req: T, validator: Joi.Schema): ValidationMessage<T> {
  const data = validator.validate(req);

  const details = data.error?.details;
  if (details?.length) {
    return { error: details[0].message, data: req };
  }
  return { data: req };
}