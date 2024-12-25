const jwt = require('jsonwebtoken')

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers['authorization'];
        if (!token) {
            return res.status(200).json({
                message: 'Please log in...',
                success: false,
                error: true
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            //console.log(err)
            //console.log('decoded', decoded)
            
            if (err) {
                console.log('err auth', err)
            }

            
          // Ensure req.user is initialized
          
          req.userId = decoded._id;
          next();

          });

        

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;