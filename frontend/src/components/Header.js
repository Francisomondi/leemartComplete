import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summeryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [search, setSearch] = useState("");
  
  const user = useSelector((state) => state?.user?.user);
  const [userState, setUserState] = useState(user);

  // ✅ Update state when user logs in
  useEffect(() => {
    setUserState(user);
  }, [user]);

  const handleSignOut = async () => {
    try {
      const response = await fetch(summeryApi.signOut.url, {
        method: summeryApi.signOut.method,
        credentials: "include", // ✅ Ensure cookies work on iPhones
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        setTimeout(() => window.location.reload(), 500); // ✅ Force navbar refresh
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : "/search");
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="container mx-auto flex items-center px-4 justify-between">
        <Link to="/">
          <img src={logo} width={120} height={80} className="max-w-full h-auto" alt="Logo" />
        </Link>

        <div className="flex items-center w-full max-w-sm border rounded-full pl-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none cursor-pointer px-2"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg bg-red-900 hover:bg-red-700 text-white px-4 py-2 rounded-r-full">
            <FiSearch />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-7">
          {userState?._id && (
            <div className="relative flex">
              <div className="text-3xl cursor-pointer" onClick={() => setMenuDisplay(!menuDisplay)}>
                {userState?.profilePic ? (
                  <img src={userState.profilePic} className="w-10 h-10 rounded-full" alt="User" />
                ) : (
                  <FaRegUser />
                )}
              </div>

              {menuDisplay && (
                <div className="absolute bg-white top-12 right-0 w-40 shadow-lg p-2 rounded-md">
                  {userState?.role === ROLE.ADMIN && (
                    <Link to="/admin-panel/all-products" className="block p-2 hover:bg-gray-100">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left p-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <Link to="/cart" className="relative text-2xl">
            <MdAddShoppingCart />
            {context?.cartProductCount > 0 && (
              <span className="bg-red-900 text-white text-sm w-5 h-5 flex items-center justify-center absolute -top-2 -right-3 rounded-full">
                {context?.cartProductCount}
              </span>
            )}
          </Link>

          {!userState?._id && (
            <Link to="/login">
              <button className="px-3 py-1 text-white bg-red-900 hover:bg-red-700 rounded-full">
                Log in
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
