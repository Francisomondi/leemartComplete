const userModel = require("../../models/userModel");

async function AllUsers(req,res){
    try {
        {/**console.log('users id', req.userId) */}
        const AllUsers = await userModel.find()

        res.json({
            message: 'users retrieved successfully',
            data: AllUsers,
            success: true,
            error: false
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = AllUsers