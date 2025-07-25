import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilePic: {
    type: String,
    default: ""
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  verificationToken: String,
  resetPasswordExpiresAt: Date,
  verificationTokenExpiresAt: Date
},
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;