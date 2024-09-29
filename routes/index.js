import express from 'express';
import userSignUpController from '../controller/userSignUp.js';
import userSignInController from '../controller/userSignIn.js';
import userDetailController from '../controller/userDetails.js';
import authToken from '../middleware/authToken.js';

const router = express.Router();

router.post('/sign-up', userSignUpController);
router.post('/sign-in', userSignInController);
router.get('/user-details', authToken, userDetailController);

export default router;
