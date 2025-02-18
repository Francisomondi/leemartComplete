import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaRegUser, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
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
  const [search, setSearch] = useState("");
  const context = useContext(Context);
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user?.user);

  const handleSignOut = async () => {
    try {
      const response = await fetch(summeryApi.signOut.url, {
        method: summeryApi.signOut.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      } else {
        throw new Error(data.error || "Sign-out failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim()) {
      navigate(`/search?q=${e.target.value}`);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40 transition-all">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        
        {/* Logo */}
        <Link to={"/"}>
          <img src={logo} width={150} height={90} alt="Logo" />
        </Link>

        {/* Search Box (Desktop) */}
        <div className="hidden md:flex items-center w-full max-w-sm border rounded-full focus-within:shadow-md transition-all pl-2">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full outline-none cursor-pointer px-2 py-1"
            onChange={handleSearch}
            value={search}
          />
          <button className="text-lg min-w-[60px] h-8 bg-red-900 hover:bg-red-700 flex items-center justify-center rounded-r-full text-white px-2 transition-all">
            <FiSearch />
          </button>
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
                <div className="absolute bg-white top-12 right-0 shadow-lg rounded p-2 w-40">
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="/admin-panel/all-products"
                      className="block hover:bg-gray-100 p-2"
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
              {context?.cartProductCount > 0 && (
                <div className="bg-red-900 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                  {context?.cartProductCount}
                </div>
              )}
            </Link>
          )}

          {/* Logout Button */}
          {user?._id ? (
            <button
              onClick={handleSignOut}
              className="px-3 py-1 text-white bg-red-900 hover:bg-red-700 rounded-full transition-all"
            >
              Log out
            </button>
          ) : (
            <Link to="/login">
              <button className="px-3 py-1 text-white bg-red-900 hover:bg-red-700 rounded-full transition-all">
                Log in
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenu && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg p-4 transition-all">
          
          {/* Search inside mobile menu */}
          <div className="flex items-center w-full border rounded-full focus-within:shadow-md pl-2 mb-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none cursor-pointer px-2 py-1"
              onChange={handleSearch}
              value={search}
            />
            <button className="text-lg min-w-[60px] h-8 bg-red-900 hover:bg-red-700 flex items-center justify-center rounded-r-full text-white px-2 transition-all">
              <FiSearch />
            </button>
          </div>

          {user?._id && user?.role === ROLE.ADMIN && (
            <Link to="/admin-panel/all-products" className="block py-2 border-b">
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
              className="w-full text-left py-2 mt-2 text-white bg-red-900 hover:bg-red-700 rounded transition-all"
            >
              Log out
            </button>
          ) : (
            <Link to="/login">
              <button className="w-full py-2 mt-2 text-white bg-red-900 hover:bg-red-700 rounded transition-all">
                Log in
              </button>
            </Link>
          )}

          {/* Social Media Links */}
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl text-blue-600 hover:text-blue-800 transition-all">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl text-pink-600 hover:text-pink-800 transition-all">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl text-blue-400 hover:text-blue-600 transition-all">
              <FaTwitter />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
