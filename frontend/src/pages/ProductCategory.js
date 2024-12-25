import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import summeryApi from '../common'
import VerticalSearchProduct from '../components/VerticalSearchProduct'

const ProductCategory = () => {

    
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const searchUrl = new URLSearchParams(location.search)
    const categoryListUrlInArray = searchUrl.getAll('category')

    const categoryListObject = {}
    categoryListUrlInArray.forEach(el=>{
      categoryListObject[el] = true
    })
    
    const [selectCategory, setSelectCategory] = useState(categoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState('')

    console.log('sortBy', sortBy)

    const fetchData = async()=>{
      setLoading(true);
      const response = await fetch(summeryApi.filterProduct.url,{
        method: summeryApi.filterProduct.method,
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify({
          category: filterCategoryList
        })
      })

      const responseData = await response.json()
      setData(responseData?.data || [])
      setLoading(false);
    }

    const handleSelectCategory = (e) =>{
      const{ name, value, checked} =  e.target

      setSelectCategory((prev)=>{
        return{
          ...prev,
          [value] : checked
        }
      })
    }

      useEffect(()=>{
        fetchData()
      },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategories = Object.keys(selectCategory).map(categoryKeyName => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName
        }
        return null  
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategories)


      const urlFormat = arrayOfCategories.map((el,index)=>{
        if ((arrayOfCategories.length - 1) ===index) {
          return `category=${el}`
        }

        return `category=${el}&&`
      })

      navigate('/product-category?'+urlFormat.join(''))    
    },[selectCategory])

    const handleSortByOnChange = async(e)=>{
      const {value} = e.target
      setSortBy(value)

      if (value === 'asc') {
        setData(prev=>prev.sort((a,b)=>a.sellingPrice-b.sellingPrice))
      }
      if (value === 'dsc') {
        setData(prev=>prev.sort((a,b)=>b.sellingPrice-a.sellingPrice))
      }

    }


    useEffect(()=>{

    },[sortBy])
  return (
    <div className='container mx-auto p-4'>
        {/**Desktop version */}
        <div className='hidden lg:grid grid-cols-[200px,1fr]'> 
             {/**left side */}
            <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
              {/**sort by  */}
                <div className=''>
                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort By</h3>
                  <form className='text-sm flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-3'>
                      <input type='radio' name='sortBy' checked ={sortBy === 'asc'} value={'asc'} onChange={handleSortByOnChange}/>
                      <label>Price - Low to High</label>
                    </div>

                    <div className='flex items-center gap-3'>
                      <input type='radio' name='sortBy' checked ={sortBy === 'dsc'} value={'dsc'} onChange={handleSortByOnChange}/>
                      <label>Price - High to Low</label>
                    </div>
                  </form>
                </div>


                 {/**filter  category*/}
                 <div className=''>
                  <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                  <form className='text-sm flex flex-col gap-2 py-2'>
                    {
                      productCategory.map((categoryName,index)=>{
                        return(
                          <div className='flex items-center gap-3' key={index}>
                            <input 
                            type='checkbox' 
                            name='category' 
                            checked={selectCategory[categoryName?.value]} 
                            value={categoryName?.value} 
                            id={categoryName?.value} 
                            onChange={handleSelectCategory}/>
                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                          </div>
                        )
                      })
                    }
                  </form>
                </div>
            </div>
            {/**right side {products}*/}
            <div className='px-4' >
              <p className='font-medium text-slate-800 text-lg my-2'>Search Results: {data.length}</p>
                <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                  {
                    data.length !== 0 &&  (
                      <VerticalSearchProduct  loading={loading} data={data}/>
                    ) 
                  }
                </div>
            </div>
        </div>      
    </div>
  )
}

export default ProductCategory
