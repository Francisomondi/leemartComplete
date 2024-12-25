
const BackendDomain = "http://localhost:8000"

const summeryApi= {
    signUP:{
        url: `${BackendDomain}/api/signup`,
        method: "post"

    },
    signIn:{
        url: `${BackendDomain}/api/signin`,
        method: "post"
    },
    currentUser:{
        url: `${BackendDomain}/api/user-details`,
        method: "get"
    },
    signOut: {
        url: `${BackendDomain}/api/signout`,
        method: 'get'
    } ,
    Allusers: {
        url: `${BackendDomain}/api/all-users`,
        method: 'get'
    } ,
    updateUser: {
        url: `${BackendDomain}/api/update-user`,
        method: 'post'
    },
    uploadProduct: {
        url: `${BackendDomain}/api/upload-product`,
        method: 'post'
    },
    allProduct: {
        url: `${BackendDomain}/api/get-product`,
        method: 'get'
    },
    updateProduct: {
        url: `${BackendDomain}/api/update-product`,
        method: 'post'
    },
    productCategory : {
        url: `${BackendDomain}/api/getProductCategory`,
        method: 'post'
    },
    categoryProducts : {
        url: `${BackendDomain}/api/category-products`,
        method: 'post'
    },
    productDetails : {
        url: `${BackendDomain}/api/product-details`,
        method: 'post'
    },
    productAddToCart : {
        url: `${BackendDomain}/api/addtocart`,
        method: 'post'
    },
    productAddToCartCount:{
        url: `${BackendDomain}/api/addtocartcount`,
        method: 'get'
    } ,
    viewCartProduct: {
        url:`${BackendDomain}/api/viewcartproduct`,
        method: 'get'
    },
    updateProductCart: {
        url:`${BackendDomain}/api/updatecartproduct`,
        method: 'post'
    },
    deleteCartProduct: {
        url:`${BackendDomain}/api/deletecartproduct`,
        method: 'post'
    },
    searchProducts: {
         url:`${BackendDomain}/api/search`,
        method: 'get'
        
    },
    filterProduct: {
        url:`${BackendDomain}/api/filter-product`,
         method: 'post'
        
    },
    stripePayment: {
        url:`${BackendDomain}/api/checkout`,
         method: 'post'
        
    }

    
}

export default summeryApi