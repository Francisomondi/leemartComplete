const { default: summeryApi } = require("../common")

const fetchCategoryProducts = async (category)=>{
const response = await fetch(summeryApi.categoryProducts.url,{
    method: summeryApi.categoryProducts.method,
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        category: category
    })
})
const dataResponse = await response.json()
return dataResponse
}

export default fetchCategoryProducts