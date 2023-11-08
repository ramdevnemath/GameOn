import nodemailer from "nodemailer"

const otpTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ramdevnemathillam@gmail.com',
        pass: 'bdqs owdx uevs clmu'
    }
})

export default otpTransporter