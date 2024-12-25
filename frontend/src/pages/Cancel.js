import React from 'react'
import CancelImage from '../assets/cancel.gif'
import {Link} from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded-lg'>
      <img src={CancelImage} alt='CancelImage'
      width={200}
      height={200}
      className='mix-blend-multiply'/>
      <p className='text-red-600 font-bold text-xl '>Payment Cancelled</p>
      <Link to={'/cart'} 
       className='p-2 px-3 mt-5 border-2 border-red-500 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>
        View Cart
      </Link>
    </div>
  )
}

export default Success
