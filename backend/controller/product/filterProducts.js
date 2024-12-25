const productModel = require("../../models/productModel");

const filterProductsContrller = async(req,res) =>{
    try { 
        const categoryList = req?.body?.category || []
        const product = await productModel.find({
            category : {
                    '$in': categoryList
            }
        })

        res.json({
            data: product,
            message: 'product',
            error: false,
            success: true
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


module.exports = filterProductsContrller