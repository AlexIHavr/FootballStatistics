import { AnySchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';

const validationMiddleware = (schema: AnySchema) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(ApiError.BadRequest(error.message));
    }

    next();
  };
};

export default validationMiddleware;
