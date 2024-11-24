import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js';


router.get('/registerUser', (req, res) => {


    UserController.registerUser(req, res)
  
})





export default router;
