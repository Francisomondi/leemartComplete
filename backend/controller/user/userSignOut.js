async function userSignOut(req,res){
    try {

     
        res.clearCookie("token")

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


async function userLogout(req,res){
    try{
        res.clearCookie("token")

        res.json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data : []
        })
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}


module.exports = userLogout