import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map((err: any) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }
  };
};
