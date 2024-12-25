const addToCartModel = require("../../models/cartProduct");

const deleteProductAddToCart = async(req,res)=>{

    try {
        const currentUserId = req.userId
        const productAddToCartId = req.body._id
        const deleteProductCart = await addToCartModel.deleteOne({_id: productAddToCartId})

            res.json({
                message: 'product Deleted successfully',
                error: false,
                success: true,
                 data: deleteProductCart
            })
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = deleteProductAddToCart