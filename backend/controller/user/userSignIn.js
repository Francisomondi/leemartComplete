const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
 try {
    const {email,password}= req.body

    if (!email) {
        throw new Error('please provide Email');
    }
    if (!password) {
        throw new Error('please provide password');
    }

    const user = await userModel.findOne({email})

       if (!user) {
            throw new Error('user not found')
       }

       const checkPassword = await bcrypt.compare(password, user.password)
    
        if (checkPassword) {
            const tokenData = {
              _id: user._id,
              email: user.email
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true
            }
            res.cookie("token",token,tokenOption).json({
                data: token,
                success: true,
                error: false,
                message: 'logged in successfully'
            });
            
        }
        else{
            throw new Error("please check the password")
        }
    
 } catch (error) {
    res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
    });
 }
}

 module.exports = userSignInController