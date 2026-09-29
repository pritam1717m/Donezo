import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from 'crypto';
import sendEmail from "../utils/sendEmail.js";



const registerUser = async (req, res) => {
    try {
        const {name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
       res.status(500).json({
        message: "Registration failed",
        error: error.message,
       }); 
    }
};

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign({
            userId: user._id,
        },
    process.env.JWT_SECRET,
{
    expiresIn: "7d",
});

res.status(200).json({
    message: "Login successful",
    token,
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
    },
});
    } catch (error) {
       console.error("Login error:", error);
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
};

const forgotPassword = async(req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({
                message: "If that email exists, a reset link has been sent.",
            });
        }
        const resetToken = crypto.randomBytes(32).toString("hex");

        const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

        user.resetPassword = hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        
        await user.save();
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        await sendEmail({
            to: user.email,
            subject: "Reset your Donezo password",
            text: `Hi ${user.name}, Click this link to reset your password: ${resetUrl}
            This link expires in 15 minutes.`,
        });

        res.status(200).json({
            message: "If that email exists, a reset link has been sent.",
        });
    } catch (error) {
       console.error("Forgot password error:", error);
        res.status(500).json({
            message: "Failed to send reset email",
        });
    }
};

const resetPassword = async(req, res ) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password ||password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

        const user = await User.findOne({
            resetPassword: hashedToken,
            resetPasswordExpires: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            return res.status(400).json({
                message: "Reset link is invalid or expired",
            });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPassword = null;
        user.resetPasswordExpires = null;

        await user.save();
        res.status(200).json({
            message: "Password reset successfull",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({
            message: "Password reset failed",
        });
    }
};

export {registerUser, loginUser, forgotPassword, resetPassword};