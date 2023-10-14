import adminSchema from "../models/adminModel.js";
import userSchema from "../models/userModel.js"
import { generateToken } from "../utils/jwt.js";
import { validationResult } from "express-validator";

export const adminLogin = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", errors: errors.array() })
    }
    try {
        const admin = await adminSchema.findOne({username: req.body.username})
        // if(!admin) {
        //     const newAdmin = await adminSchema.create({
        //         username: req.body.username,
        //         password: req.body.password
        //     })
        //     newAdmin.save()
        //     return res.json("new admin created")
        // }
        if(!admin || !(await admin.matchPassword(req.body.password))) {
            return res.status(401).json({ status: 'error', message: 'Invalid username or password.' });
        }
        const payload = {
            id: admin._id,
            role: process.env.ADMIN_CONST
        }
        const token = generateToken(payload)
        await admin.save()
        return res.status(200).json({ status: "ok", admin, token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await userSchema.find()
        if(!users) {
            return res.status(404).json({ status: "error", message: "User model not found" })
        }
        return res.status(200).json({ status: "ok", message: "Users data fetched succesfully", users })
    } catch (error) {
        console.error("Internal server error", error)
    }
}

export const userControl = async (req, res) => {
    try {
        const userId = req.body.userId
        
        const user = await userSchema.findById(userId)
        if(!user) {
            throw new Error('User ID is not matching in db')
        }
        user.isActive = !user.isActive
        const updated = await user.save()
        return res.status(200).json(updated)
    } catch (error) {
        console.error("Internal server error", error)
        return res.status(400).json(error)
    }
}