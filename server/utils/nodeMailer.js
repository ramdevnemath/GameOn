import nodemailer from "nodemailer"

const mailTransporter = (resetPasswordToken, user) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ramdevnemathillam@gmail.com',
            pass: 'bdqs owdx uevs clmu'
        }
    })
    
    const mailOptions = {
        from: 'ramdevnemathillam@gmail.com',
        to: user.email,
        subject: 'Password Reset',
        text: `Click this link to reset your password: http://localhost:3000/password-reset/${user._id}/${resetPasswordToken}`
    }
    
    transporter.sendMail( mailOptions, (error, info) => {
        if(error) {
            console.log(error)
        } else {
            console.log("Email sent: " + info.response)
            return res.status(200).json({ status: "Success", message: "Email sent" })
        }
    })
}

export default mailTransporter