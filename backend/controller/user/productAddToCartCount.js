const addToCartModel = require("../../models/cartProduct");

 const productAddToCartCount= async (req,res)=>{
    try {
        const userId = req.userId
        const count = await addToCartModel.countDocuments({
            userId : userId
        })
        res.json({
            message: 'ok',
            error: false,
            success: true,
            data: {count: count}
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }

 }

 module.exports = productAddToCartCount