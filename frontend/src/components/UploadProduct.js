import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import productCategory from '../helpers/productCategory'; 
import { IoIosCloudUpload } from "react-icons/io";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDeleteForever } from "react-icons/md";
import summeryApi from '../common';
import { toast } from 'react-toastify'

const UploadProduct = ({onClose,fetchData}) => {

  const [data,setData] = useState(
    {
      productName: '',
      brandName: '',
      category: '',
      productImage: [],
      description: '',
      price: '',
      sellingPrice: ''
    }
  )
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState('')

 const handleOnchange = (e)=>{
  const {name,value} = e.target
  setData((preve)=>{
    return{
      ...preve,
      [name]: value
    }
   })
   

 }

 const handleProductUpload = async (e)=>{

   const file = e.target.files[0]
   const uploadImageCloudanary = await uploadImage(file)
   
   setData((preve)=>{
    return{
      ...preve,
      productImage: [...preve.productImage, uploadImageCloudanary.url]
    }
   })
   
 }

 const handleImageDelete =async (index)=>{
  console.log('index', index)

  const  newProductImage = [...data.productImage]
  newProductImage.splice(index,1)

  setData((preve)=>{
    return{
      ...preve,
      productImage: [...newProductImage]
    }
   })

 }

 /**handle product form submit */
 const handleSubmit = async(e)=>{
  e.preventDefault()
  const response = await fetch(summeryApi.uploadProduct.url,{
    method: summeryApi.uploadProduct.method,
    credentials: 'include',
    headers:{
      'content-type' : 'application/json'
    },
    body: JSON.stringify(data)
  })

  const dataResponse = await response.json()

  if (dataResponse.success) {
    toast.success(dataResponse?.message)
    onClose()
    fetchData()
  }

  if (dataResponse.error) {
    toast.error(dataResponse?.message)
  }

 }

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

            <div className='flex justify-between items-center'>   
                <h2 className='font-bold text-lg'>Upload products</h2> 
                <div className='w-fit ml-auto text-2xl hover:text-red-900 cursor-pointer' onClick={onClose}
                      >
                    <IoClose />
                </div>
            </div>

            <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
              <label htmlFor='productName'>Product Name</label>
              <input 
                  type='text' 
                  id='productName' 
                  placeholder='Product name' 
                  value={data.productName} 
                  name = 'productName'
                  onChange={handleOnchange}
                  className='p-2 bg-slate-100 border rounded-md'
                  required/>

              <label htmlFor='brandName' className='mt-3'>Brand Name</label>
              <input 
                  type='text' 
                  id='brandName' 
                  placeholder='Brand name' 
                  value={data.brandName} 
                  name='brandName'
                  onChange={handleOnchange}
                  className='p-2 bg-slate-100 border rounded-md'
                  required/>
                  
              <label htmlFor='category' className='mt-3'>Category</label>
              <select 
                  value={data.category} 
                  name='category'
                  onChange={handleOnchange}
                  className='p-2 bg-slate-100 border rounded-md'
                  required>
                        <option 
                          value={''} 
                        >
                            Select Category
                        </option>
                        {
                          productCategory.map((el,index)=>{
                            return(
                            <option 
                              value={el.value} 
                              key={el.value+index}>
                                {el.label} 
                            </option>)
                            
                          })
                        }

              </select>
              

              <label htmlFor='productImage'>Product Image</label>
              <label htmlFor='uploadImageInput'>
                  <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>  
                      <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                        <span className='text-4xl'><IoIosCloudUpload /></span>
                        <p className='text-sm'>Upload Product Image</p>
                        <input
                          type='file'
                          id='uploadImageInput'
                          className='hidden' onChange={handleProductUpload}/>
                      </div>
                  </div>
              </label>
              <div className='flex items-center gap-2'>
                
                {
                  data?.productImage[0] ? (
                    data.productImage.map((el,index)=>{
                      return(

                        <div className='relative group'>
                          <img src={el} 
                              alt={el} 
                              width={80} 
                              height={80}  
                              className='bg-slate-100 border cursor-pointer'  
                              onClick={()=>{
                                setOpenFullScreenImage(true)
                                setFullScreenImage(el)
                              }}
                          
                          />
                          <div className='absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleImageDelete(index)}>
                            <MdDeleteForever />
                          </div>
                        </div>
                       
                      )
                    })

                  ):(
                      <p className='text-red-900 text-xs'>Upload Images...</p>
                  )
                }
               
              </div>
              <label htmlFor='price'>Price</label>
              <input 
                  type='number' 
                  id='price' 
                  placeholder='Price' 
                  value={data.price} 
                  name = 'price'
                  onChange={handleOnchange}
                  className='p-2 bg-slate-100 border rounded-md'
                  required/>

              <label htmlFor='sellingPrice'>Selling Price</label>
              <input 
                  type='number' 
                  id='sellingPrice' 
                  placeholder='Selling Price' 
                  value={data.sellingPrice} 
                  name = 'sellingPrice'
                  onChange={handleOnchange}
                  className='p-2 bg-slate-100 border rounded-md'
                  required/>

              <label htmlFor='description'>Description</label>
              <textarea 
                  className='h-28 bg-slate-100 border resize-none p-1' 
                  onChange={handleOnchange} 
                  id='description' 
                  name='description' 
                  value={data.description} 
                  placeholder='Enter product description'
                  required>

              </textarea>

              <button className='px-3 py-2 bg-red-900 text-white mb-10 hover:bg-red-700'>Upload Product</button>

            </form>            
        </div>

        {/** */}

        {
          openFullScreenImage && (
            <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
          )
            
          
        }
        
    </div>
  )
}

export default UploadProduct
