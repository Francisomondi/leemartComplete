async function userSignOut(req,res){
    try {

        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: "none"

        }
        res.clearCookie("token",tokenOption)

        res.json({
            message: 'Logged out successfully',
            error: false,
            success: true,
            data: []
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
     }
    
}

module.exports = userSignOut


