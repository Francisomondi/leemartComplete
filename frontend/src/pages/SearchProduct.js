import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import summeryApi from '../common'
import VerticalSearchProduct from '../components/VerticalSearchProduct'

const SearchProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
 
    console.log('query', query.search)

    const fetchProduct = async() => {
      setLoading(true)
      const response = await fetch(summeryApi.searchProducts.url+query.search)
      const dataResponse = await response.json()

      setLoading(false)
      setData(dataResponse?.data)
      
    }

    useEffect(()=>{
      fetchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading...</p>
        )
      }
      <p className='text-lg font-semibold my-3'>Search Results: {data.length}</p> 
      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center p-4'>No data found</p>
        )
      }

     
      {
        data.length !==0 && !loading && (
              <VerticalSearchProduct loading={loading} data={data}/>     
        )
      }
       
    </div>
  )
}

export default SearchProduct
