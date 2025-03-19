import express from 'express'
import { login ,logout,register,googleAuth} from '../controllers/authController.js'
import {move} from '../controllers/gameController.js'

const router=express.Router()



router.post('/register', register);
router.post('/login', login);
router.post('/auth/google/callback', googleAuth);
router.post('/logout', logout);
router.post('/move',move)


export default router;