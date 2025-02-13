const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

async function userSignInController(req, res) {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide both email and password",
                error: true,
                success: false
            });
        }

        // Convert email to lowercase to prevent case sensitivity issues
        email = email.toLowerCase();

        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Check password
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                message: "Invalid email or password",
                error: true,
                success: false
            });
        }

        // Prepare token data
        const tokenData = {
            _id: user._id,
            email: user.email,
            role: user.role // Include role for authorization checks
        };

        // Generate JWT token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "8h" });

        // Cookie settings for security
        const tokenOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 8 * 60 * 60 * 1000 // 8 hours in milliseconds
        };

        // Set token in cookie
        res.cookie("token", token, tokenOptions);

        // Send response with user data (excluding password)
          
        res.json({
            message: "Logged in successfully",
            success: true,
            error: false,
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                profilePic: user.profilePic || null
            },
            token
            
        });
        setTimeout(() => {
            window.location.reload(); // ✅ Force navbar refresh
          }, 500);

    } catch (error) {
        console.error("Sign-in Error:", error); // Log for debugging
        res.status(500).json({
            message: "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = userSignInController;
