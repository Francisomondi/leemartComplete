async function userSignOut(req, res) {
    try {
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        // Expire the token instead of just clearing it
        res.cookie("token", "", { expires: new Date(0), ...tokenOption });

        res.json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });

    } catch (error) {
        console.error("Error during sign out:", error); // Log for debugging

        res.status(500).json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        });
    }
}

module.exports = userSignOut;
