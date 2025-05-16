import { Router } from 'express';
import { signinController, loginController } from './auth.controller';
import { signupSchema, loginSchema } from './auth.validation';
import { validate } from '../../middlewares/validate.middleware';

const router = Router();

router.post('/signup', validate(signupSchema), signinController);
router.post('/login', validate(loginSchema), loginController);

export default router;

