import express from 'express'
import { updateProfile,getProfile,getProfilePic,uploadProfilePic } from '../controllers/userController.js'
import verifyUser from '../middlewares/auth.js'
import {upload} from '../middlewares/upload.js'

const router=express.Router()

router.put('/profile',verifyUser,updateProfile)
router.get('/profile',verifyUser,getProfile)
router.get('/profilePic',verifyUser,getProfilePic)
router.post('/upload-profile', upload.single("profilePic"),verifyUser,uploadProfilePic)

router.get('/',verifyUser,(req,res)=>{
    return res.send('Success')
  })


export default router;