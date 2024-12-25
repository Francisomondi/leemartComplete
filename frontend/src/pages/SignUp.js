import React, { useState } from 'react'
import loginIcons from '../assets/signin.gif'
import { IoEyeOffSharp } from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import imageToBase64 from '../helpers/imageToBase64';
import summeryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword,setShowPassword]= useState(false)
  const [showConfirmPassword,setShowConfirmPassword]= useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: ''

  })

  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const {name,value} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name]: value
      }
    })
  }
const handleUploadPic = async(e)=>{
  const file = e.target.files[0]

  const imagePic = await imageToBase64(file)
  
  setData((preve)=>{
    return{
      ...preve,
      profilePic : imagePic
    }
  })

}

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(summeryApi.signUP.url,{
        method: summeryApi.signUP.method,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()
      
      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }

       if(dataApi.error){
        toast.error(dataApi.message)
      }
    }
    else{
      toast("passwords do not match")
    }
  }
  
  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-6 w-full max-w-sm mx-auto rounded'>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
              <div>
              <img src={data.profilePic || loginIcons} alt='sign up icon'/>
              </div>
              <form>
                <label>
                  <div className='text-xs bg-opacity-80 bg-slate-200 text-center pb-4 pt-2 cursor-pointer absolute bottom-0 w-full '>
                    Upload photo
                  </div>
                  <input type='file' className='hidden' onChange={handleUploadPic}/>
                </label>
               
              </form>
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
                <label>Name: </label>
                <div className='bg-slate-100 p-2'>
                  <input 
                    type='text' 
                    name='name'
                    placeholder='Enter your User name...' 
                    value={data.name}
                    onChange={handleOnChange}
                    className='w-full h-full outline-none bg-transparent'
                    required/>
                </div>
                
              </div>
              <div className='grid'>
                <label>Email: </label>
                <div className='bg-slate-100 p-2'>
                  <input 
                    type='email' 
                    name='email'
                    placeholder='Enter your Email...' 
                    value={data.email}
                    onChange={handleOnChange}
                    className='w-full h-full outline-none bg-transparent'
                    required/>
                </div>
                
              </div>
              <div>
                <label>Password: </label>
                <div  className='bg-slate-100 p-2 flex'>
                   <input 
                   type={showPassword ?"text":"password"} 
                   placeholder='Enter your password...' 
                   name='password'
                   value={data.password}
                   required
                   onChange={handleOnChange}
                   className='w-full h-full outline-none bg-transparent' /> 
                   <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                    <span><IoEyeOffSharp/></span>
                   </div>
                </div>
                
                
              </div>
              <div>
                <label>Confirm Password: </label>
                <div  className='bg-slate-100 p-2 flex'>
                   <input 
                   type={showConfirmPassword ? "text":"password"} 
                   placeholder='Enter your password...' 
                   name='confirmPassword'
                   value={data.confirmPassword}
                   onChange={handleOnChange}
                   className='w-full h-full outline-none bg-transparent' 
                   required/> 
                   <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                    <span><IoEyeOffSharp/></span>
                   </div>
                </div>
                
                
              </div>
              <button 
                className='bg-red-900 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>
                Sign Up
              </button>
            </form>

            <p className='my-5'> Have an account? <Link to={'/login'} className='hover:text-red-900 hover:underline'>Login</Link></p>
        </div>
      </div>
      
    </section>
  )
}

export default SignUp
