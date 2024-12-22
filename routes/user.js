import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';
import { authenticate } from '../config/tokenAuthenticate.js';
import multer from 'multer';
import { productFileUpload } from '../config/multerStorage.js';





const upload = multer({ storage: productFileUpload() });


router.post('/registerUser', (req, res) => {


    UserController.registerUser(req, res)

})

router.post('/login', (req, res) => {


    UserController.login(req, res)

})
router.post('/getUserList', authenticate, UserController.getUserList)
router.post('/getUserDetailsByid', authenticate, UserController.getUserDetailsByid);
router.post('/add_product', authenticate, upload.single('productImage'), UserController.add_product);




export default router;
