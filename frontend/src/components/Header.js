import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import summeryApi from '../common';
import Context from '../context';
import { FaRegUser } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);

  const user = useSelector((state) => state.user.user);

  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleSignOut = async () => {
    try {
      const response = await fetch(summeryApi.signOut.url, {
        method: summeryApi.signOut.method,
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null)); // Clear user state
        navigate('/');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to="/">
            <img src="/logo.png" alt="Logo" width={150} />
          </Link>
        </div>

        <div className="flex items-center gap-7">
          {user ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setMenuDisplay((prev) => !prev)}
                  className="text-2xl"
                >
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <FaRegUser />
                  )}
                </button>

                {menuDisplay && (
                  <div className="absolute bg-white top-12 shadow-lg p-4 rounded">
                    {user.role === 'admin' && (
                      <Link to="/admin-panel">Admin Panel</Link>
                    )}
                  </div>
                )}
              </div>

              <Link to="/cart" className="text-2xl relative">
                <MdAddShoppingCart />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm rounded-full px-1">
                  {context.cartProductCount || 0}
                </span>
              </Link>

              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
