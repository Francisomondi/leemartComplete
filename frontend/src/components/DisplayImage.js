import React from 'react'
import { IoClose } from 'react-icons/io5'

const DisplayImage = ({imgUrl,onClose}) => {
  return (
    <div className='fixed botton-0 top-0 right-0 left-0 flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-2'>
                <div className='w-fit ml-auto text-2xl hover:text-red-900 cursor-pointer' onClick={onClose}
                      >
                    <IoClose />
                </div>
            <div className='flex justify-center p-4 max-w-[70vw] max-h-[80vh]'>
                <img src={imgUrl} alt='' className='w-full h-full'/>
            </div>
        </div>
        
    </div>
  )
}

export default DisplayImage
