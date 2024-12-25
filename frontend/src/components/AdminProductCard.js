import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci";
import EditProduct from './EditProduct';
import displayCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({data,fetchData}) => {
    const [editProduct, setEditProduct]= useState(false)
  return (
    <div className='bg-white p-3 rounded'>
        <div className='w-40'>
          <div className='w-32 h-32 flex justify-center items-center'>
            <img src={data?.productImage[0]} alt='' width={150} height={150} className='mx-auto object-fill h-full'/>
          </div>
               
                <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>
                <div>

                    <p className='font-semibold'>
                      {
                        displayCurrency(data.sellingPrice)
                      }
                      
                    </p>
                    <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                          <CiEdit/>
                    </div>

                </div>

                

                {
                editProduct && (
                  <EditProduct  productData={data} onClose={()=>setEditProduct(false)} fetchData={fetchData}/>
          
                )}
        </div>
    </div>
  )
}

export default AdminProductCard
