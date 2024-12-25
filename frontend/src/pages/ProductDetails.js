import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import summeryApi from '../common'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import displayCurrency from '../helpers/displayCurrency';
import VerticalProductCard from '../components/VerticalProductCard';
import AllCategoryProductDisplay from '../components/AllCategoryProductDisplay';
import Context from '../context';
import addToCart from '../helpers/addToCart';

const ProductDetails = () => {
  const [data,setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: ''
  })
  const params = useParams()
  const [loading,setLoading] = useState(false)
  const productListLoading = new Array(5).fill(null)
  const [activeImage,setActiveImage] = useState('')

  const [zoomImageCoordinate, setImageZoomCoordinate] = useState({
    x:0,
    y:0
  })

  const [zoomImage, setZoomImage] = useState(false)
 

  const fetchProductDetails = async () =>{
    setLoading(true)

    const response = await fetch(summeryApi.productDetails.url,{
      method: summeryApi.productDetails.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })  

    if (!response.ok) {
      throw new Error(`Failed to fetch user details: ${response.statusText}`);
    }

   setLoading(false)

    const dataResponse = await response.json()
    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }
   
  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseImageHover = (image)=>{
    setActiveImage(image)
  }

  const {fetchUserAddToCart} = useContext(Context)
  const navigate = useNavigate()

  const handleAddToCart = async(e,id)=>{
      await addToCart(e,id)
     fetchUserAddToCart()
  }

const handleImageZoom = useCallback((e) =>{

  setZoomImage(true)
 const {left, top, width, height} = e.target.getBoundingClientRect()
 //console.log('coordinate', left,top,width,height)
 const x = (e.clientX - left) / width
 const y = (e.clientY - top) / height

 setImageZoomCoordinate({
  x,
  y
 })
 
},[zoomImageCoordinate])

const handleLeaveZoomOutImage = ()=>{
  setZoomImage(false)
}

const handleBuy = async(e,id)=>{
  await addToCart(e,id)
  fetchUserAddToCart()
  navigate('/cart')
}
  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-2'>
        {/**product image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-6 p-2'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} 
              alt='detailedpc'
              className='h-full w-full object-scale-down mix-blend-multiply'
              onMouseMove={handleImageZoom}
              onMouseLeave={handleLeaveZoomOutImage}/>

              {/**Image zoom */}

              {
                zoomImage && (
                  <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[550px] top-0'>
                    <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                        style={{
                          backgroundImage: `url(${activeImage})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`                          
                        }}>                          
                    </div>
                  </div>
                )
              }
              
          </div>
          <div className='h-full'>
            {
              loading ? (
               <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                     productListLoading.map((el,index) => {
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={'loading image'+index}>                        
                        </div>
                      )
                    })
                  }
               </div>
                
              ): (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((image,index) => {
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={index}>
                           <img src={image} 
                            className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' 
                            alt='product'
                            onMouseEnter={()=>handleMouseImageHover(image)}
                            />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/**product datails */}
       {
        loading ? (
          <div className='grid gap-1 w-full'>
            <p className='bg-slate-200 animate-pulse h-6 w-full rounded-full inline-block '></p>
            <h2 className='text-2xl lg:text-4xl h-6 bg-slate-200 animate-pulse font-medium w-full'></h2>
            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 w-full'></p>

            <div className='flex text-yellow-500 bg-slate-200 h-6 animate-pulse items-center gap-1 w-full'>
              
            </div>

            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse w-full'>
              <p className='text-red-600 bg-slate-200 w-full'></p>
              <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
            </div>

            <div className=''>
              <p className='my-1 h-6 bg-slate-200 rounded animate-pulse w-full'> </p>
              <p className='bg-slate-200 rounded animate-pulse h-10 w-full'></p>              
            </div>

            <div className='flex items-center gap-3 my-2'>
              <button className='h-6 bg-slate-200 rounded animate-pulse w-full'></button>
              <button className='h-6 bg-slate-200 rounded animate-pulse w-full'></button>
            </div>
          </div>
        ):(
          <div className='flex flex-col gap-1'>
          <p className='bg-red-200 text-red-900 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
          <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
          <p className='capitalize text-slate-400'>{data?.category}</p>

          <div className='flex text-yellow-500 items-center gap-1'>
            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaStarHalfAlt/>
          </div>

          <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
            <p className='text-red-900'>{displayCurrency(data.sellingPrice)}</p>
            <p className='text-slate-400 line-through'>{displayCurrency(data.price)}</p>
          </div>

          <div className=''>
            <p className='text-slate-600 font-medium my-1'>Description: </p>
            <p className='text-medium'>{data?.description}</p>              
          </div>

          <div className='flex items-center gap-3 my-2'>
            <button 
              className='border-2 border-red-900 rounded px-3 py-1 min-w-[150px] text-red-900 font-medium hover:bg-red-900 hover:text-white'
              onClick={(e)=>{handleBuy(e,data?._id)}}
              >
              Buy
            </button>
            <button 
              className='border-2 border-red-900 rounded px-3 py-1 min-w-[150px] font-medium text-white bg-red-900 hover:text-red-700 hover:bg-white'
              onClick={(e)=>{handleAddToCart(e,data?._id)}}>
                Add To Cart
            </button>
          </div>
          </div>
        )
       }

      </div>

        {
        data.category && (
          <AllCategoryProductDisplay category={data?.category} heading={'Recommended products'}/>
        )
        }
      
    </div>
  )
}

export default ProductDetails
