import { Router } from 'express';
import { signinController, loginController } from './auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { signupSchema, loginSchema } from './auth.validation';

const router = Router();

router.post('/signup', validate(signupSchema), signinController);
router.post('/login', validate(loginSchema), loginController);

export default router;
