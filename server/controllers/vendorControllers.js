import multer from "multer";
import { validationResult } from "express-validator"
import Vendor from "../models/vendorModel.js";

const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })

export const register = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", errors: errors.array() })
    }

    const { fname, lname, email, phone, password } = req.body;
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
            fname,
            lname,
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
