import multer from "multer";
import { validationResult } from "express-validator"
import Vendor from "../models/vendorModel.js";
import mailTransporter from "../utils/nodeMailer.js"
import { generateToken } from "../utils/jwt.js"

const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })

export const register = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", errors: errors.array() })
    }

    const { fullName, turfName, email, phone, password } = req.body;
    const { idProof, groundProof } = req.files;

    try {

        let emailExists = await Vendor.exists({ email: req.body.email })
        if (emailExists) {
            return res.status(400).json({ status: "error", errors: ["Email already exists"] })
        }   
        let phoneExists = await Vendor.exists({ phone: req.body.phone })
        if (phoneExists) {
            return res.status(400).json({ status: "error", errors: ["Phone number already exists"] })
        }

        const vendor = new Vendor({
            fullName,
            turfName,
            email,
            phone,
            password,
            idProof: idProof[0].buffer,
            groundProof: groundProof[0].buffer,
        });

        if (vendor) {
            await vendor.save();
            return res.status(200).json({ status: "ok", vendor })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const VendorPasswordReset = async (req, res) => {
    const { email } = req.body
    try {
        const vendor = await Vendor.findOne({ email: email })
        if (!vendor) {
            return res.status(401).json({ status: "error", message: "User does not exists" })
        }
        const payload = {
            id: vendor._id,
            role: process.env.VENDOR_CONST
        }
        const token = generateToken(payload)
        Vendor.resetPasswordToken = token
        vendor.resetPasswordExpires = Date.now() + 2 * 60 * 60 * 1000
        await vendor.save()
        mailTransporter(token, vendor)
        res.status(200).json({ status: "success", message: "Reset token generated and sent to the user" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
}

export const VendorChangePassword = async (req, res) => {
    const { password, id, token } = req.body
    try {
        if (!token) {
            console.log("Token missing")
            return res.status(401).json({ status: "error", message: "Token has expired" })
        }
        const vendor = await Vendor.findByIdAndUpdate(
            id,
            { password: password },
            {
                new: true,
                runValidators: true
            }
        )
        await vendor.save()
        return res.status(200).json({ status: "ok", vendor, token })
    } catch (error) {
        console.error("Error updating password", error.message)
    }
}

export const vendorLogin = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", errors: errors.array() })
    }
    try {
        const vendor = await Vendor.findOne({ email: req.body.email })
        if (!vendor || !(await vendor.matchPassword(req.body.password))) {
            console.log("Vendor not find. || Password is not matching")
            return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
        } 
        if (!vendor.isActive) {
            console.log("Vendor is blocked")
            return res.status(402).json({ status: "blocked", message: "User is blocked" })
        }
        const payload = {
            id: vendor._id,
            role: process.env.VENDOR_CONST
        }
        const token = generateToken(payload)
        const { idProof, groundProof, ...modifiedVendor } = vendor.toObject();
        return res.status(200).json({ status: "ok", modifiedVendor, token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
}

export const homePage = async (req, res) => {
    res.send("home page rendered succesfully")
}