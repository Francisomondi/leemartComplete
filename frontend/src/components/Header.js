import React, { useContext, useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summeryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLsearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLsearch.get("q") || ""; // Ensure it's a string

  const [search, setSearch] = useState(searchQuery);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const menuRef = useRef(null);

  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    const { value } = e.target;
    setSearch(value);

    if (value.trim()) {
      navigate(`/search?q=${value}`);
    } else if (searchQuery) {
      navigate("/");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        
        {/* Logo */}
        <div>
          <Link to={"/"}>
            <img src={logo} width={150} height={90} alt="Logo" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center w-full max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full outline-none cursor-pointer px-2 py-1"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[60px] h-8 bg-red-900 hover:bg-red-700 flex items-center justify-center rounded-r-full text-white px-2">
            <FiSearch />
          </div>
        </div>

        {/* Icons & User Actions */}
        <div className="flex items-center gap-5">
          
          {/* User Profile */}
          {user?._id && (
            <div className="relative flex justify-center">
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name || "User"}
                  />
                ) : (
                  <FaRegUser />
                )}
              </div>

              {menuDisplay && (
                <div
                  ref={menuRef}
                  className="absolute bg-white top-12 right-0 h-fit p-2 shadow-lg rounded w-40"
                >
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={"/admin-panel/all-products"}
                        className="block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <MdAddShoppingCart />
              {context?.cartProductCount > 0 && (
                <div className="bg-red-900 hover:bg-red-700 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                  <p className="text-sm">{context?.cartProductCount}</p>
                </div>
              )}
            </Link>
          )}

          {/* Login / Logout */}
          <div>
            {user?._id ? (
              <button
                onClick={handleSignOut}
                className="px-3 py-1 text-white bg-red-900 hover:bg-red-700 rounded-full"
              >
                Log out
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="px-3 py-1 text-white bg-red-900 hover:bg-red-700 rounded-full">
                  Log in
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden text-2xl cursor-pointer">
            {mobileMenu ? (
              <AiOutlineClose onClick={() => setMobileMenu(false)} />
            ) : (
              <AiOutlineMenu onClick={() => setMobileMenu(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="sm:hidden bg-white shadow-md absolute top-16 left-0 w-full p-5">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border p-2 rounded mb-3"
            onChange={handleSearch}
            value={search}
          />
          <Link
            to={"/cart"}
            className="block py-2 border-b"
            onClick={() => setMobileMenu(false)}
          >
            Cart
          </Link>
          {user?._id ? (
            <button
              onClick={handleSignOut}
              className="w-full py-2 mt-3 bg-red-900 text-white rounded"
            >
              Log out
            </button>
          ) : (
            <Link to={"/login"} className="block py-2">
              Log in
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
