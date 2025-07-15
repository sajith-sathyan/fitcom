import express from 'express';
import { getPublicKey } from '../controllers/RsaController.js';
import { RegisterUser,AuthUserViaGoogle,LoginUser,LogoutUser } from '../controllers/AuthController.js';

const router = express.Router();


router.get('/rsa/public-key', getPublicKey);

router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.get('/oauth-google',AuthUserViaGoogle );
router.get('/logout', LogoutUser);





export default router;
