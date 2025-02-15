import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch, FiMenu } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import logo from "../assets/logo.png";
import summeryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user?.user);

  const handleSignOut = async () => {
    const deleteData = await fetch(summeryApi.signOut.url, {
      method: summeryApi.signOut.method,
      credentials: "include",
    });

    const data = await deleteData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.error);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        
        {/* Logo */}
        <Link to={"/"}>
          <img src={logo} width={150} height={90} alt="Logo" />
        </Link>

        {/* Search Box */}
        <div className="hidden md:flex items-center w-full max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full outline-none cursor-pointer"
          />
          <div className="text-lg min-w-[60px] h-8 bg-red-900 hover:bg-red-700 flex items-center justify-center rounded-r-full text-white">
            <FiSearch />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          
          {/* User Profile / Admin Panel */}
          {user?._id && (
            <div className="relative flex justify-center">
              <div
                className="text-3xl cursor-pointer flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegUser />
                )}
              </div>

              {menuDisplay && (
                <div className="absolute bg-white top-12 right-0 shadow-lg rounded p-2">
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="/admin-panel/all-products"
                      className="block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          {user?._id && (
            <Link to="/cart" className="text-2xl relative">
              <MdAddShoppingCart />
              <div className="bg-red-900 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                {context?.cartProductCount}
              </div>
            </Link>
          )}

          {/* Logout Button */}
          {user?._id ? (
            <button
              onClick={handleSignOut}
              className="px-3 py-1 text-white bg-red-900 hover:bg-red-700 rounded-full"
            >
              Log out
            </button>
          ) : (
            <Link to="/login">
              <button className="px-3 py-1 text-white bg-red-900 hover:bg-red-700 rounded-full">
                Log in
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            <FiMenu className="text-2xl" />
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenu && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg p-4">
          
          {user?._id && (
            <div className="flex items-center mb-3">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-10 h-10 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegUser className="text-3xl" />
              )}
              <span className="ml-2">{user?.name}</span>
            </div>
          )}

          {user?._id && user?.role === ROLE.ADMIN && (
            <Link
              to="/admin-panel/all-products"
              className="block py-2 border-b"
              onClick={() => setMobileMenu(false)}
            >
              Admin Panel
            </Link>
          )}

          {user?._id && (
            <Link to="/cart" className="block py-2 border-b">
              Cart ({context?.cartProductCount})
            </Link>
          )}

          {user?._id ? (
            <button
              onClick={handleSignOut}
              className="w-full text-left py-2 mt-2 text-white bg-red-900 hover:bg-red-700 rounded"
            >
              Log out
            </button>
          ) : (
            <Link to="/login">
              <button className="w-full py-2 mt-2 text-white bg-red-900 hover:bg-red-700 rounded">
                Log in
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
