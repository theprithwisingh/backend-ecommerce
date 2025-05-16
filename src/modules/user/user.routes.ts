import { Router } from 'express';
import { profileController } from './user.controller';
import { authMiddleware } from '../utils/authMiddleware';
// import { validate } from '../../middlewares/validate.middleware';
// import { AddressSchema, UpdateUserSchema } from './user.validation';
const router = Router();

router.get("/profile", authMiddleware,profileController);



// router.put("/profile/userInfo",authMiddleware,validate(UpdateUserSchema),userController);
// router.put("/profile/address", authMiddleware,validate(AddressSchema),userController);

export default router;