import express from 'express'
import { body } from "express-validator"
import * as userController from "../controllers/userControllers.js"

const userRouter = express.Router()

userRouter.post('/register',
    [
        body('fname').trim().isLength({ min: 1 }).withMessage('First name is required'),
        body('lname').trim().isLength({ min: 1 }).withMessage('Last name is required'),
        body('email').trim().isEmail().withMessage('Invalid email address'),
        body('phone').trim().isMobilePhone().withMessage('Invalid phone number'),
        body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ], 
    userController.register
)
userRouter.get('/', userController.homePage)
userRouter.post('/auth/login', userController.userLogin)
userRouter.post('/auth/google', userController.googleAuth)
userRouter.post('/password-reset', userController.resetPassword)
userRouter.post('/post-password-reset', userController.changePassword)

export default userRouter