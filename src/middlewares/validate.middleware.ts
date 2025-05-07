import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate = (schema: ZodSchema<any>): RequestHandler => {
  const middleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Validation failed',
          errors: error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
        return;
      }

      console.error("Unexpected validation error:", error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
  };

  return middleware;
};

