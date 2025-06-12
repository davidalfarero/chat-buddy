import bcryptjs from 'bcryptjs';
import { sendResetPasswordEmail, sendResetSuccessEmail, sendVerificationEmail, sendVerifiedEmail } from '../emails/emails.js';
import User from '../models/userModel.js';
import { tokenService } from '../utils/tokenService.js';
import crypto from 'crypto';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) return res.status(400).json({ success: false, message: "Email already exists." });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000
    });

    await user.save();

    await sendVerificationEmail(user.email, user.name, verificationToken);

    tokenService(res, user._id);

    res.status(201).json({
      success: true,
      message: "User successfully created",
      user: {
        ...user._doc,
        password: undefined
      }
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code."
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await sendVerifiedEmail(user.email, user.name);

    const { password, __v, ...sanitizedUser } = user._doc;

    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
      user: sanitizedUser
    });

  } catch (error) {
    console.error("Error in verifyEmail controller:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: "Username or Password is incorrect." });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Username or Password is incorrect." });
    }

    tokenService(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(400).json({ success: false, message: "Internal Server Error." });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.log("Error in logout controller.", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendResetPasswordEmail(user.email, user.name, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    console.log("Generated reset token:", resetToken);
    res.status(200).json({ success: true, message: "Password reset link sent to your email." });

  } catch (error) {
    console.log("Error in forgotPassword controller: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset password token" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email, user.name);

    res.status(200).json({ success: true, message: "Password reset successful." });
  } catch (error) {
    console.log("Error in resetPassword", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile photo is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkRoute = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkRoute controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};