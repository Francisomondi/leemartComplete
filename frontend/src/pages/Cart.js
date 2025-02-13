import React, { useContext, useEffect, useState } from 'react';
import summeryApi from '../common';
import Context from '../context';
import displayCurrency from '../helpers/displayCurrency';
import { MdDeleteForever } from 'react-icons/md';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [phone, setPhone] = useState('');
  const context = useContext(Context);

  const fetchData = async () => {
    try {
      const response = await fetch(summeryApi.viewCartProduct.url, {
        method: summeryApi.viewCartProduct.method,
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
      });
      const responseData = await response.json();
      if (responseData.success) setData(responseData.data);
    } catch (error) {
      console.error('Error loading cart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const updateCartQty = async (id, qty, increase = true) => {
    if (!increase && qty <= 1) return;
    const response = await fetch(summeryApi.updateProductCart.url, {
      method: summeryApi.updateProductCart.method,
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ _id: id, quantity: increase ? qty + 1 : qty - 1 }),
    });
    if ((await response.json()).success) fetchData();
  };

  const deleteCartProduct = async (id) => {
    if (!id) return;
    const response = await fetch(summeryApi.deleteCartProduct.url, {
      method: summeryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ _id: id }),
    });
    if ((await response.json()).success) fetchData();
  };

  const clearCart = async () => {
    const response = await fetch(summeryApi.clearCart.url, {
      method: summeryApi.clearCart.method,
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
    });
    if ((await response.json()).success) setData([]);
  };

  const totalQty = data.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = data.reduce((acc, item) => acc + item.quantity * item.productId.sellingPrice, 0);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const response = await fetch('http://localhost:8000/api/stk', {
      method: 'post',
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ phone, amount: totalPrice }),
    });
    setIsProcessing(false);
    alert((await response.json()).success ? 'Payment initiated successfully!' : 'Payment failed.');
  };

  const handleCardPayment = async () => {
    setIsProcessing(true);
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(summeryApi.stripePayment.url, {
      method: summeryApi.stripePayment.method,
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ cardItems: data }),
    });
    setIsProcessing(false);
    const responseData = await response.json();
    if (responseData?.id) stripe.redirectToCheckout({ sessionId: responseData.id });
  };

  return (
    <div className='container mx-auto'>
      {data.length === 0 && !loading && (
        <div className='text-center'>
          <p className='bg-white py-5 text-lg font-semibold'>Your cart is empty</p>
          <button className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 mt-3' onClick={() => window.location.href = '/'}>
            Continue Shopping
          </button>
        </div>
      )}

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
        <div className='w-full max-w-3xl'>
          {loading ? <div className='h-32 bg-slate-200 animate-pulse'></div> : data.map((product) => (
            <div key={product._id} className='w-full bg-white h-auto my-2 border border-slate-300 rounded flex flex-col md:flex-row'>
              <img src={product.productId.productImage[0]} alt='' className='w-32 h-32 object-scale-down' />
              <div className='px-4 py-2 relative'>
                <button className='absolute right-0 text-red-900 p-2 hover:bg-red-700 hover:text-white' onClick={() => deleteCartProduct(product._id)}>
                  <MdDeleteForever />
                </button>
                <h2 className='text-lg'>{product.productId.productName}</h2>
                <p>{displayCurrency(product.productId.sellingPrice * product.quantity)}</p>
                <div className='flex gap-3'>
                  <button className='border p-1' onClick={() => updateCartQty(product._id, product.quantity, false)}>-</button>
                  <span>{product.quantity}</span>
                  <button className='border p-1' onClick={() => updateCartQty(product._id, product.quantity)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.length > 0 && (
          <div className='w-full max-w-sm'>
            <h2 className='bg-red-900 text-white px-4 py-1'>Summary</h2>
            <p>Quantity: {totalQty}</p>
            <p>Total: {displayCurrency(totalPrice)}</p>
            <form onSubmit={handleFormSubmit}>
              <input type='number' placeholder='Enter M-Pesa phone number' value={phone} onChange={(e) => setPhone(e.target.value)} required className='border p-2 w-full' />
              <button type='submit' className='bg-blue-600 text-white w-full mt-2' disabled={isProcessing}>{isProcessing ? 'Processing...' : 'Pay via M-Pesa'}</button>
            </form>
            <button className='bg-blue-600 text-white w-full mt-2' onClick={handleCardPayment} disabled={isProcessing}>{isProcessing ? 'Processing...' : 'Pay via Card'}</button>
            <button className='bg-red-600 text-white w-full mt-2' onClick={clearCart}>Clear Cart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;