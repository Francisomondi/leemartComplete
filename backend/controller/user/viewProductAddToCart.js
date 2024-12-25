const addToCartModel = require("../../models/cartProduct");

const viewProductAddToCart = async(req,res)=>{
 try {
    const currentUser = req.userId

    const allCartProducts = await addToCartModel.find({
        userId: currentUser
    }).populate('productId')

    res.json({
        data: allCartProducts,
        success: true,
        error: false
    })
 } catch (error) {
    res.status(500).json({
        message: error.message || error,
        error: true,
        success: false
    }); 
 }
}

module.exports = viewProductAddToCart