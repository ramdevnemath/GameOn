import mongoose from 'mongoose';
import bcrypt from "bcrypt"
// import crypto from "crypto"

const vendorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  turfName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String
  },
  idProof: {
    type: Buffer,
    required: true
  },
  groundProof: {
    type: Buffer,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

vendorSchema.pre("save", async function(next){
    if(!this.isModified("password")){
      next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })

  vendorSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false
    return await bcrypt.compare(enteredPassword, this.password)
  }

  vendorSchema.methods.generatePasswordResetToken = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordExpires = Date.now() + 3600000
};


const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;