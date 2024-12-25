const productModel = require("../../models/productModel");

const getCategoryProducts = async (req,res)=>{
    try {
        const {category} = req?.body || req.query
        const product = await productModel.find({category})

        res.json({
            data: product,
            message: ' fetch category products ',
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

module.exports = getCategoryProducts