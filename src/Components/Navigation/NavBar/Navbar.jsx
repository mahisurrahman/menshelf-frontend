import React, { useState, useEffect, useRef, useContext } from "react";
import NavLogo from "../NavLogo/NavLogo";
import "./NavBar.css";
import NavMenus from "../Navmenus/NavMenus";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, setUser, allCarts } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const getUser = () => {
    try {
      let userDetails = JSON.parse(localStorage.getItem("userCreds"));
      setUser(userDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDocumentClick = (event) => {
    if (
      (dropdownRef.current && !dropdownRef.current.contains(event.target)) ||
      (userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target))
    ) {
      setDropdownVisible(false);
      setUserDropdownVisible(false);
    }
  };

  const handleMouseEnterDropdown = () => {
    setDropdownVisible(true);
    setUserDropdownVisible(false);
  };

  const handleMouseEnterUserDropdown = () => {
    setUserDropdownVisible(true);
    setDropdownVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userCreds");
    Swal.fire("Logged Out");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (dropdownVisible || userDropdownVisible) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [dropdownVisible, userDropdownVisible]);

  useEffect(() => {
    getUser();
  }, []);

  const renderUserDropdown = () => {
    if (user?.userType === 2) {
      return (
        <div
          ref={userDropdownRef}
          className="absolute w-48 bg-twelth text-primary top-12 right-0 rounded-lg shadow-lg"
        >
          <div className="flex flex-col py-1">
            <NavLink
              to="/user/dash"
              className="hover:text-white text-[16px] font-normal pl-4 py-1"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/user/dash/cart"
              className="hover:text-white text-[16px] font-normal pl-4 py-1"
            >
              Cart
            </NavLink>
            <NavLink
              to="/user/dash/orders"
              className="hover:text-white text-[16px] font-normal pl-4 py-1"
            >
              Orders
            </NavLink>
            <button
              onClick={() => {
                handleLogout();
                setUserDropdownVisible(false);
              }}
              className="hover:text-white text-[16px] font-normal pl-4 py-1 text-left"
            >
              Logout
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          ref={userDropdownRef}
          className="absolute w-48 bg-twelth text-primary top-12 right-0 rounded-lg shadow-lg"
        >
          <div className="flex flex-col py-1">
            <NavLink
              to="/admin/panel"
              className="hover:text-white text-[16px] font-normal pl-4 py-1"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/panel/allproducts"
              className="hover:text-white text-[16px] font-normal pl-4 py-1"
            >
              All Products
            </NavLink>
            <NavLink
              to="/admin/panel/createproducts"
              className="hover:text-white text-[16px] font-normal pl-4 py-1"
            >
              Create Products
            </NavLink>
            <button
              onClick={() => {
                handleLogout();
                setUserDropdownVisible(false);
              }}
              className="hover:text-white text-[16px] font-normal pl-4 py-1 text-left"
            >
              Logout
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-fourth text-white grid grid-cols-12 py-[10px] px-10 sticky top-0 z-10 h-[10vh]">
      <div className="col-span-3 flex justify-start items-center">
        <NavLogo />
      </div>
      <div className="col-span-9 flex justify-end items-center relative">
        <NavMenus />
        <div
          onMouseEnter={handleMouseEnterDropdown}
          className={
            user ? "user-dropdown-wrapper ml-5" : "guest-dropdown-wrapper ml-5"
          }
        >
          <NavLink
            to="/faq"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-bold"
                : "hover:text-primary text-[18px] font-normal"
            }
          >
            FAQ
          </NavLink>
          {/* {dropdownVisible && (
            <div
              ref={dropdownRef}
              className={`absolute text-primary pl-4 pt-2 w-60 bg-twelth top-[54px] right-0 rounded-lg ${
                user ? "user-dropdown" : "guest-dropdown"
              }`}
            >
              <div className="flex flex-col gap-2 pb-4">
                <div>
                  <NavLink
                    to="/faq"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "font-bold"
                        : "hover:text-white text-[16px] font-normal"
                    }
                  >
                    FAQ
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    to="/flashsales"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "font-bold"
                        : "hover:text-white text-[16px] font-normal"
                    }
                  >
                    Flash Sales
                  </NavLink>
                </div>
              </div>
            </div>
          )} */}
        </div>
        {user ? (
          <div className="relative flex items-center">
            <div onMouseEnter={handleMouseEnterUserDropdown}>
              <img
                src={`http://localhost:8000/images/${user?.userImg}`}
                className="border-2 border-fifth w-10 h-10 object-cover rounded-full ml-5"
                alt=""
              />
              {userDropdownVisible && renderUserDropdown()}
            </div>
            {user?.userType === 2 ? (
              <Link to="/user/dash/cart" className="ml-5">
                <div className="flex items-center gap-2">
                  <FaShoppingCart size={24} />
                  <p className="text-xl font-bold">{allCarts.length}</p>
                </div>
              </Link>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="pl-5 flex items-center gap-5">
            <Link to="/signup">
              <button className="bg-white text-primary px-6 py-2 rounded-lg uppercase tracking-widest text-sm flex items-center font-bold duration-700 hover:duration-700 hover:bg-sixth">
                Signup
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-fourth border-2 border-white px-6 py-2 rounded-lg uppercase tracking-widest text-sm flex items-center font-bold duration-700 hover:duration-700 text-white hover:bg-white hover:text-primary">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
