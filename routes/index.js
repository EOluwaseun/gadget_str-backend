import express from 'express';
import userSignUpController from '../controller/user/userSignUp.js';
import userSignInController from '../controller/user/userSignIn.js';
import userDetailController from '../controller/user/userDetails.js';
import authToken from '../middleware/authToken.js';
import userLogoutController from '../controller/user/userLogout.js';
import allUserController from '../controller/user/allUsers.js';
import updateUserController from '../controller/user/updateUserRole.js';
import uploadProductController from '../controller/product/uploadProduct.js';
import getProductController from '../controller/product/getProduct.js';
import updateProductController from '../controller/product/updateProduct.js';
import getCategoryProduct from '../controller/product/getCategoryProduct.js';
import getCategoriesWiseProduct from '../controller/product/getCategoryWiseProduct.js';

const router = express.Router();

router.post('/sign-up', userSignUpController);
router.post('/sign-in', userSignInController);
router.get('/user-details', authToken, userDetailController);
router.get('/user-logout', userLogoutController);
router.get('/all-users', authToken, allUserController);
router.post('/update-users', authToken, updateUserController);

// product
router.post('/upload-product', authToken, uploadProductController);
router.get('/all-product', getProductController);
router.post('/update-product', authToken, updateProductController);
router.get('/get-categoryProduct', getCategoryProduct);
router.post('/category-product', getCategoriesWiseProduct);

export default router;
