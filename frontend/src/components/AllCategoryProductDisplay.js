import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context';
import fetchCategoryProducts from '../helpers/fetchCategoryProducts';
import displayCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import scrollTop from '../helpers/scrollTop';

const AllCategoryProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { fetchUserAddToCart } = useContext(Context);

    const loadingList = new Array(6).fill(null); // Reduced for better mobile performance

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const categoryProducts = await fetchCategoryProducts(category);
            setData(categoryProducts?.data || []);
            setLoading(false);
        };
        fetchData();
    }, [category]);

    return (
        <div className="container mx-auto px-4 my-6">
            <h2 className="text-xl sm:text-2xl font-semibold py-4">{heading}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory">
                {loading
                    ? loadingList.map((_, index) => (
                          <div
                              key={index}
                              className="w-full min-w-[200px] sm:min-w-[250px] bg-white rounded-md shadow-lg"
                          >
                              <div className="bg-slate-200 h-40 sm:h-48 p-4 flex justify-center items-center animate-pulse"></div>
                              <div className="p-3 grid gap-2">
                                  <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
                                  <div className="h-4 bg-slate-200 w-3/4 rounded-full animate-pulse"></div>
                                  <div className="flex gap-2">
                                      <div className="h-4 w-1/2 bg-slate-200 rounded-full animate-pulse"></div>
                                      <div className="h-4 w-1/3 bg-slate-200 rounded-full animate-pulse"></div>
                                  </div>
                                  <div className="h-8 bg-slate-200 rounded-full animate-pulse"></div>
                              </div>
                          </div>
                      ))
                    : data.map((product, index) => (
                          <Link
                              key={product?._id || index}
                              to={'/product/' + product?._id}
                              className="w-full min-w-[200px] sm:min-w-[250px] bg-white rounded-md shadow-lg transition-transform hover:scale-105"
                              onClick={scrollTop}
                          >
                              <div className="bg-gray-100 h-40 sm:h-48 flex justify-center items-center">
                                  <img
                                      src={product?.productImage[0]}
                                      alt={product?.productName}
                                      className="h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply"
                                  />
                              </div>
                              <div className="p-3 grid gap-2">
                                  <h2 className="text-sm sm:text-base font-medium text-ellipsis line-clamp-1 text-black">
                                      {product?.productName}
                                  </h2>
                                  <p className="capitalize text-gray-500 text-xs sm:text-sm">{product?.category}</p>
                                  <div className="flex gap-2 items-center">
                                      <p className="text-red-700 font-semibold text-sm sm:text-base">
                                          {displayCurrency(product?.sellingPrice)}
                                      </p>
                                      <p className="text-gray-400 line-through text-xs sm:text-sm">
                                          {displayCurrency(product?.price)}
                                      </p>
                                  </div>
                                  <button
                                      className="text-xs sm:text-sm bg-red-700 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full"
                                      onClick={(e) => handleAddToCart(e, product?._id)}
                                  >
                                      Add to Cart
                                  </button>
                              </div>
                          </Link>
                      ))}
            </div>
        </div>
    );
};

export default AllCategoryProductDisplay;
