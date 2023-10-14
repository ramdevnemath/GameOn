import express from 'express'
import { body } from 'express-validator'
import * as adminController from "../controllers/adminControllers.js"

const adminRouter = express.Router()

adminRouter.post('/auth/login', 
    [
        body('username').trim().isLength({ min: 1 }).withMessage('Username is required'),
        body('password').trim().isLength({ min: 1 }).withMessage('Password is required')
    ],
    adminController.adminLogin
)

adminRouter.get('/users-list', adminController.getUsers)
adminRouter.put('/user-control', adminController.userControl)

export default adminRouter