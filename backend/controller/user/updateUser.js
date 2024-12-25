const userModel = require("../../models/userModel");

async function updateUser(req,res){
    try {

        const sessionUser = req.userId

        const {userId, name,email,role}= req.body

        const payload = {
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role}),
            
        }

        const user = await userModel.findById(sessionUser)
        {/**console.log('user-role',user.role) */}

        const updateUser= await  userModel.findByIdAndUpdate(userId,payload)

        res.json({
            message: 'User updated successfully',
            success: true,
            error: false,
            data: updateUser
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }

}

module.exports = updateUser 