const addToCartModel = require("../../models/cartProduct");

const updateProductAddToCart = async (req,res)=>{
try {
    const currentUserId = req.userId
    const productAddToCartId = req?.body?._id
    const qty = req.body.quantity

    const updateCartProduct = await addToCartModel.updateOne({_id: productAddToCartId},{
        ...(qty &&  { quantity: qty })
    })
    res.json({
        message: 'updated successfully',
        data: updateCartProduct,
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

module.exports = updateProductAddToCart