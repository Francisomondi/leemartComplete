const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

       const user = await userModel.findOne({email})

       if (user) {
            throw new Error('user already exist')
       }

        if (!email) {
            throw new Error('please provide Email');
        }
        if (!password) {
            throw new Error('please provide password');
        }
        if (!name) {
            throw new Error('please provide a name');
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const payload = {
            ...req.body,
            role: 'GENERAL',
            password: hashPassword
        };

        const userData = new userModel(payload);
        const savedUser = await userData.save(); // Wait for the save operation

        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: 'user created successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;