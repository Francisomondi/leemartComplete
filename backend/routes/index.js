const express = require('express')

const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userSignOut = require('../controller/user/userSignOut')
const AllUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getProductCategory = require('../controller/product/getSingleProductCategory')
const getCategoryProducts = require('../controller/product/getCategoryProducts')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const productAddToCartCount = require('../controller/user/productAddToCartCount')
const viewProductAddToCart = require('../controller/user/viewProductAddToCart')
const updateProductAddToCart = require('../controller/user/updateProductAddToCart')
const deleteProductAddToCart = require('../controller/user/deleteProductAddToCart')
const searchProduct = require('../controller/product/searchProducts')
const filterProductsContrller = require('../controller/product/filterProducts')

const createToken = require('../controller/payments/token')
const stkController = require('../controller/payments/stk')
const callbackHandler = require('../controller/payments/callbackHandler')
const paymentController = require('../controller/payments/stripe/paymentContoller')
const webhook = require('../controller/payments/stripe/webhooks')




const router = express.Router()



router.post('/signup', userSignUpController)
router.post('/signin', userSignInController)
router.get('/user-details', authToken, userDetailsController)
router.get('/signout', userSignOut)


//admin panel
router.get('/all-users',authToken,AllUsers)
router.post('/update-user',authToken,updateUser)

//add products route
router.post('/upload-product', authToken, UploadProductController)
router.get('/get-product', getProductController)
router.post('/update-product',authToken,updateProductController)
router.get('/getProductCategory', getProductCategory)
router.post('/category-products', getCategoryProducts)
router.post('/product-details', getProductDetails)
router.get('/search', searchProduct)
router.post('/filter-product', filterProductsContrller)


//add to cart
router.post('/addtocart', authToken, addToCartController)
router.get('/addtocartcount', authToken, productAddToCartCount)
router.get('/viewcartproduct', authToken, viewProductAddToCart)
router.post('/updatecartproduct', authToken, updateProductAddToCart)
router.post('/deletecartproduct', authToken, deleteProductAddToCart)

//payment access token
router.get('/token', createToken)
router.post('/stk', stkController)


//stripe payment 
router.post('/checkout',authToken, paymentController)
router.post('/webhook', webhook)


module.exports = router

