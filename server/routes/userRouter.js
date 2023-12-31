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
userRouter.post('/verify-otp', userController.register)
userRouter.get('/', userController.homePage)
userRouter.post('/auth/login',
    [
        body("email").trim().isLength({ min: 1 }).withMessage("Email is required"),
        body("password").trim().isLength({ min: 1 }).withMessage("Password is required")
    ],
    userController.userLogin
)
userRouter.post('/auth/google', userController.googleAuth)
userRouter.post('/password-reset', userController.resetPassword)
userRouter.post('/post-password-reset', userController.changePassword)
userRouter.get('/turf-details', userController.getTurfs)
userRouter.get('/venues/:id', userController.getVenue)
userRouter.post('/venue/review-rating', userController.saveReview)
userRouter.post('/is-review-exists', userController.isReview)

export default userRouter