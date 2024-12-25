import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalSearchProduct = ({loading,data=[]}) => {
    const loadingList = new Array(13).fill(null)


    const {fetchUserAddToCart} = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
       fetchUserAddToCart()
    }

  return (
      <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,300px))] justify-center md:justify-between md:gap-2 overflow-x-scroll scrollbar-none transition-all' 
       >

            {
                loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <Link to={'product/'+product?._id} className='w-full min-w-[330px] md:min-w-[380px] max-w-[380px] md:max-w-[420px] bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                    
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis py-2 line-clamp-1 text-black p-1 animate-pulse rounded-full bg-slate-200'>
                                        
                                    </h2>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p> 
                                    <div className='flex gap-3'>
                                        <p className='text-red-900 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>                        
                                        
                                    </div>  
                                    <button className='text-sm  text-white px-3 animate-pulse rounded-full bg-slate-200 py-2'></button>
                                                 
                                </div>
                            </Link> 
                        )
                    })
                ):(
                    data.map((product,index)=>{
                        return(
                            <Link to={'/product/'+product?._id} 
                                className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow'
                                onClick={scrollTop}>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                    <img 
                                        src={product?.productImage[0]}  
                                        alt='' 
                                        className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply'/>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                                        {product?.productName}
                                    </h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p> 
                                    <div className='flex gap-3'>
                                        <p className='text-red-900 font-medium'>{ displayCurrency(product.sellingPrice) }</p>
                                        <p className='text-slate-500 line-through'>{ displayCurrency(product.price) }</p>                        
                                        
                                    </div>  
                                    <button className='text-sm bg-red-900 hover:bg-red-700 text-white px-3 py-1 rounded-full' onClick={(e)=>{handleAddToCart(e,product?._id)}}>Add to Card</button>
                                                 
                                </div>
                            </Link> 
                        )
                    })
                )
                
            }
        </div>
    
  )
}

export default VerticalSearchProduct
