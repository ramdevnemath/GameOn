import jwt from "jsonwebtoken"

export const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })
    return token
}

export const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        return payload
    } catch (error) {
        return false
    }
}