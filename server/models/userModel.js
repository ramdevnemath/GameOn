import mongoose from 'mongoose';
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
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
    type: String,
  },
  picture: {
    type: String,
  }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
      next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })

  userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false
    return await bcrypt.compare(enteredPassword, this.password)
  }

const User = mongoose.model('User', userSchema);

export default User;