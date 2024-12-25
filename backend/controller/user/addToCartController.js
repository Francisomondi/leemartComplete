const addToCartModel = require("../../models/cartProduct")

const addToCartController = async (req,res)=>{
    try {
        const {productId} = req.body
        const currentUser = req.userId 

        const isProductAvailable = await addToCartModel.findOne({productId, userId: currentUser})
        if (isProductAvailable) {
            return res.json({
                message: 'Product already exists in cart',
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }
        const addTocart = new addToCartModel(payload)
        const saveProduct = await addTocart.save() 

         res.json({
            message: 'Product added to cart successfully',
            success: true,
            error: false,
            data: saveProduct        
        })
        
    } catch (error) {
            res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = addToCartController 