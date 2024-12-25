import React from 'react'
import ProductCategory from '../components/ProductCategory'
import BannerProduct from '../components/BannerProduct'
import HorizontalProductCard from '../components/HorizontalProductCard'
import VerticalProductCard from '../components/VerticalProductCard'


const Home = () => {
  return (
    <div>
      <ProductCategory/>
      <BannerProduct/>
      <HorizontalProductCard category= {'airpods'} heading={'Top Airpods'}/>
      <VerticalProductCard category={'mobiles'} heading={'Mobiles'}/>
      <VerticalProductCard category={'furniture'} heading={'Furniture'}/>
      <VerticalProductCard category={'mouse'} heading={'Mouse'}/>
      <VerticalProductCard category={'television'} heading={'Television'}/>
      <VerticalProductCard category={'earphones'} heading={'Wired Earphones'}/>
     
    </div>
  )
}

export default Home
