import express from 'express';
import userSignUpController from '../controller/userSignUp.js';
import userSignInController from '../controller/userSignIn.js';
import userDetailController from '../controller/userDetails.js';
import authToken from '../middleware/authToken.js';
import userLogoutController from '../controller/userLogout.js';
import allUserController from '../controller/allUsers.js';
import updateUserController from '../controller/updateUserRole.js';

const router = express.Router();

router.post('/sign-up', userSignUpController);
router.post('/sign-in', userSignInController);
router.get('/user-details', authToken, userDetailController);
router.get('/user-logout', userLogoutController);
router.get('/all-users', authToken, allUserController);
router.post('/update-users', authToken, updateUserController);

export default router;
