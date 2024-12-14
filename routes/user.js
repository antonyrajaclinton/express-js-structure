import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';
import { authenticate } from '../config/tokenAuthenticate.js';


router.post('/registerUser', (req, res) => {


    UserController.registerUser(req, res)

})

router.post('/login', (req, res) => {


    UserController.login(req, res)

})
router.post('/getUserList', authenticate, UserController.getUserList)




export default router;
