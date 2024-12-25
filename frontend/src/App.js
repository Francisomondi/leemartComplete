import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import summeryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';


function App() {

const dispatch = useDispatch()
const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {

    try {
      const dataResponse = await fetch(summeryApi.currentUser.url, {
        method: summeryApi.currentUser.method,
        credentials: 'include',
      });

      const userData = await dataResponse.json()

      if (userData.success) {
        dispatch(setUserDetails(userData.data))
      }  
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Error fetching user details: ' + error.message);
    }
  };


  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(summeryApi.productAddToCartCount.url, {
      method: summeryApi.productAddToCartCount.method,
      credentials: 'include',
    });

    const userData = await dataResponse.json()

    console.log('userData', userData)
    setCartProductCount(userData?.data?.count)
  }
  useEffect(() => {
    //user details
    fetchUserDetails()

    //fetch add to cart 
    fetchUserAddToCart()
    
  }, []);

  return (
    <>
    
      <Context.Provider value= {
        { 
          fetchUserDetails, 
          cartProductCount,  
          fetchUserAddToCart 
        }
      }>
        <ToastContainer position='top-center'/>
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />         
        </main>
        <Footer />
      </Context.Provider>
     
    </>
  );
}

export default App;
