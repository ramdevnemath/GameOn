import { validationResult } from "express-validator"
import userSchema from "../models/userModel.js"
import { generateToken } from "../utils/jwt.js"
import mailTransporter from "../utils/nodeMailer.js"
import otpTransporter from "../utils/otpMailer.js"
import Turf from "../models/turfModel.js"
import Review from "../models/reviewModel.js"
import bcrypt from "bcrypt"

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

export const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", errors: errors.array() })
    }
    try {
        if (req.body.otp) {
            const user = await userSchema.create({
                fname: req.body.formData.fname,
                lname: req.body.formData.lname,
                email: req.body.formData.email,
                phone: req.body.formData.phone,
                password: req.body.formData.password
            })

            if (user) {
                return res.status(200).json({ status: "ok", message: "User registration success" })
            }

        } else {

            let emailExists = await userSchema.exists({ email: req.body.email })
            if (emailExists) {
                return res.status(400).json({ status: "error", errors: ["Email already exists"] })
            }
            let phoneExists = await userSchema.exists({ phone: req.body.phone })
            if (phoneExists) {
                return res.status(400).json({ status: "error", errors: ["Phone number already exists"] })
            }
            const otp = generateOTP()

            const mailOptions = {
                from: "ramdevnemathillam@gmail.com",
                to: req.body.email,
                subject: "OTP Verification",
                text: `Your OTP for registration is: ${otp}`,
            }

            otpTransporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(400).json({ status: "error", error: ["Error sending OTP"] });
                } else {
                    return res.status(200).json({ status: "ok", message: "OTP sent succesfully", otp })
                }
            })
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
    console.log(password)
    try {

        if (!token) {
            console.log("Token missing")
            return res.status(401).json({ status: "error", message: "Token has expired" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userSchema.findByIdAndUpdate(
            id,
            { password: hashedPassword },
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

export const getTurfs = async (req, res) => {

    try {

        const turfs = await Turf.find()
        res.status(200).json(turfs)
    } catch (error) {

        console.error(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
}

export const getVenue = async (req, res) => {

    try {

        const turfId = req.params.id
        const turf = await Turf.findOne({ _id: turfId })
        if (turf) {
            res.status(200).json(turf)
        }

    } catch (error) {

        console.error(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" })
    }
}

export const saveReview = async (req, res) => {

    const userId = req.body.userId
    const review = req.body.reviewText
    const rating = req.body.rating
    const turfId = req.body.turfId

    try {
        const isReviewExists = await Review.findOne({ userId: userId, turfId: turfId })
        if(isReviewExists) {

            const updateReview = await Review.updateOne(
                { userId: userId, turfId: turfId },
                { review: review, rating: rating }
            )
            res.status(201).json(updateReview)

        } else {

            const addReview = await Review.create({
                userId: userId,
                review: review,
                rating: rating,
                turfId: turfId
            })
            res.status(200).json(addReview)
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", error: "Internal Server Error" }) 
    }
}