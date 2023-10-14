import express from 'express'
import { body } from 'express-validator'
import { upload } from '../controllers/vendorControllers.js'
import * as vendorController from "../controllers/vendorControllers.js"


const vendorRouter = express.Router()

vendorRouter.post('/register',

    upload.fields([{ name: 'idProof', maxCount: 1 }, { name: 'groundProof', maxCount: 1 }]),
    [
        body('fname').trim().isLength({ min: 1 }).withMessage('First name is required'),
        body('lname').trim().isLength({ min: 1 }).withMessage('Last name is required'),
        body('email').trim().isEmail().withMessage('Invalid email address'),
        body('phone').trim().isMobilePhone().withMessage('Invalid phone number'),
        body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('idProof').custom((value, { req }) => {
            if (!req.files || !req.files['idProof']) {
                throw new Error('ID Proof file is required');
            }
            return true;
        }),
        body('groundProof').custom((value, { req }) => {
            if (!req.files || !req.files['groundProof']) {
                throw new Error('Ground Proof file is required');
            }
            return true;
        }),
    ],
    vendorController.register
)

export default vendorRouter