import React, { useContext, useState } from 'react'
import loginIcons from '../assets/signin.gif'
import { IoEyeOffSharp } from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import summeryApi from '../common';
import {  toast } from 'react-toastify';

import Context from '../context';

const Login = () => {

  const [showPassword,setShowPassword]= useState(false)
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const {fetchUserDetails, fetchUserAddToCart} = useContext(Context)

  

  const handleOnChange = (e)=>{
    const {name,value} = e.target
    setData((prev)=>{
      return{
        ...prev,
        [name]: value
      }
    })
  }

  //console.log("form data" ,data)

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const dataResponse = await fetch(summeryApi.signIn.url,{
      method: summeryApi.signIn.method,
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json'
      },  
      body: JSON.stringify(data)    
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      
      toast.success(dataApi.message)
      navigate("/")
      fetchUserDetails()
      fetchUserAddToCart()
      
     
    }

     if(dataApi.error){
      toast.error('kindly log in')
    }

  }

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-6 w-full max-w-sm mx-auto rounded'>
            <div className='w-20 h-20 mx-auto'>
              <img src={loginIcons} alt='login icon'/>
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='grid'>
                <label>Email: </label>
                <div className='bg-slate-100 p-2'>
                  <input 
                    type='email' 
                    name='email'
                    placeholder='Enter your Email...' 
                    value={data.email}
                    onChange={handleOnChange}
                    className='w-full h-full outline-none bg-transparent'/>
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
                   onChange={handleOnChange}
                   className='w-full h-full outline-none bg-transparent' /> 
                   <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                    <span><IoEyeOffSharp/></span>
                   </div>
                </div>
                <Link to={'/forgot-password'} 
                   className='block w-fit ml-auto hover:underline hover:text-red-900'>
                     Forgot password?
                </Link>
                
              </div>
              <button className='bg-red-900 hover:bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>
            </form>

            <p className='my-5'>Do not have an account? <Link to={'/sign-up'} className='hover:text-red-900 hover:underline'>Sign Up</Link></p>
        </div>
      </div>
      
    </section>
  )
}

export default Login
