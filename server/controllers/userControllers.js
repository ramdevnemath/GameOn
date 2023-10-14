import { validationResult } from "express-validator"
import userSchema from "../models/userModel.js"
import { generateToken } from "../utils/jwt.js"
import mailTransporter from "../utils/nodeMailer.js"

export const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", errors: errors.array() })
    }
    try {
        let emailExists = await userSchema.exists({ email: req.body.email })
        if (emailExists) {
            return res.status(400).json({ status: "error", errors: ["Email already exists"] })
        }
        let phoneExists = await userSchema.exists({ phone: req.body.phone })
        if (phoneExists) {
            return res.status(400).json({ status: "error", errors: ["Phone number already exists"] })
        }
        const user = await userSchema.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        })
        if (user) {
            return res.status(200).json({ status: "ok", user })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
}

export const homePage = (req, res) => {
    res.send("home page rendered succesfully")
}

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({ status: "error", message: "Access denied. Token is missing" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.error(error);
        return res.status(403).json({ status: 'error', message: 'Invalid token.' });
    }
}

export const userLogin = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", errors: errors.array() })
    }
    try {
        const user = await userSchema.findOne({ email: req.body.email })

        if (!user || !(await user.matchPassword(req.body.password))) {
            return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
        } else if (!user.isActive) {
            return res.status(402).json({ status: "blocked", message: "User is blocked" })
        }
        const payload = {
            id: user._id,
            role: process.env.USER_CONST
        }
        const token = generateToken(payload)
        return res.status(200).json({ status: "ok", user, token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
}

export const googleAuth = async (req, res) => {
    const { given_name, family_name, email, picture } = req.body
    try {
        const userExists = await userSchema.findOne({ email })
        if (!userExists) {
            const user = await userSchema.create({
                fname: given_name,
                lname: family_name,
                email: email,
                picture: picture,
                isActive: true
            })
            const payload = {
                id: user._id,
                role: process.env.USER_CONST
            }
            const token = generateToken(payload)
            return res.status(200).json({ status: "ok", user, token })
        } else if (!userExists.isActive) {
            return res.status(402).json({ status: "blocked", message: "User is blocked" })
        } else {
            const payload = {
                id: userExists._id,
                role: process.env.USER_CONST
            }
            const token = generateToken(payload)
            return res.status(200).json({ status: "ok", userExists, token })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
}

export const resetPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await userSchema.findOne({ email: email })
        if (!user) {
            return res.status(401).json({ status: "error", message: "User does not exists" })
        }
        const payload = {
            id: user._id,
            role: process.env.USER_CONST
        }
        const token = generateToken(payload)
        userSchema.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 2 * 60 * 60 * 1000
        await user.save()
        mailTransporter(token, user)
        res.status(200).json({ status: "success", message: "Reset token generated and sent to the user" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
}

export const changePassword = async (req, res) => {
    const { password, id, token } = req.body
    try {
        if (!token) {
            console.log("Token missing")
            return res.status(401).json({ status: "error", message: "Token has expired" })
        }
        const user = await userSchema.findByIdAndUpdate(
            id,
            { password: password },
            {
                new: true,
                runValidators: true
            }
        )
        await user.save()
        return res.status(200).json({ status: "ok", user, token })
    } catch (error) {
        console.error("Error updating password", error.message)
    }
}