import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Ye line add karein
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  const location = useLocation();
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setShowSearchIcon(true);
    } else {
      setShowSearchIcon(false);
    }
  }, [location]);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      <ul className="sm:flex gap-5 text-sm text-gray-700 hidden">
        <NavLink className={"flex flex-col items-center gap-1"} to={"/"}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-500 hidden" />
        </NavLink>
        <NavLink
          className={"flex flex-col items-center gap-1"}
          to={"/collection"}
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-500 hidden" />
        </NavLink>
        <NavLink className={"flex flex-col items-center gap-1"} to={"/about"}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-500 hidden" />
        </NavLink>
        <NavLink className={"flex flex-col items-center gap-1"} to={"/contact"}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-500 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {showSearchIcon && (
          <img
            onClick={() => {
              setShowSearch(true);
            }}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />
        )}
        <div className="group relative">
  <img
    onClick={() => {
      if (token) {
        setShowDropdown(!showDropdown); // Click par toggle hoga
      } else {
        navigate("/login");
      }
    }}
    className="w-5 cursor-pointer"
    src={assets.profile_icon}
    alt=""
  />
  
  {/* Dropdown Menu logic update karein */}
  {token && (
    <div className={`${showDropdown ? 'block' : 'hidden'} group-hover:block absolute dropdown-menu right-0 pt-4 z-50`}>
      <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
        <Link to="/login" onClick={() => setShowDropdown(false)}>
          <p className="cursor-pointer hover:text-black">My Profile</p>
        </Link>
        <p
          onClick={() => {
            navigate("/orders");
            setShowDropdown(false);
          }}
          className="cursor-pointer hover:text-black"
        >
          Orders
        </p>
        <p onClick={() => { logout(); setShowDropdown(false); }} className="cursor-pointer hover:text-black">
          Logout
        </p>
      </div>
    </div>
  )}
</div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => {
            setVisible(true);
          }}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* SideBar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => {
              setVisible(false);
            }}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 pl-6 border border-gray-500"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 pl-6 border-b border-gray-500"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 pl-6 border-b border-gray-500"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 pl-6 border-b border-gray-500"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
