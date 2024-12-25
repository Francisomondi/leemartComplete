const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email:{
        required:true,
        type: String,
        unique: true
    },
    password: String,
    profilePic: String,
    role: String
   
},
{
    timestamps: true
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel