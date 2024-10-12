import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlusCircle,
  FaTimesCircle,
  FaTrash,
  FaListAlt,
  FaHourglassHalf,
  FaCheckCircle,
  FaUsers,
  FaUserShield,
  FaBolt,
  FaTags,
  FaStar,
} from "react-icons/fa";
import { GiDeliveryDrone } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdDiscount } from "react-icons/md";
import Swal from "sweetalert2";
import { MdReviews } from "react-icons/md";
import { PiElevatorFill } from "react-icons/pi";

const AdminSidebar = ({ user, setUser }) => {
  const navigate = useNavigate("/");

  const handleLogout = () => {
    const removeUser = localStorage.removeItem("userCreds");
    Swal.fire("Logged Out");
    setUser(null);
    navigate("/");
  };

  const links = (
    <>
      <NavLink
        to="/admin/panel"
        end
        className={({ isActive, isPending }) =>
          isPending
            ? ""
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2 border-b"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2 "
        }
      >
        <FaTachometerAlt className="text-2xl  mr-4" />
        Dashboard
      </NavLink>
      <NavLink
        to="/admin/panel/allproducts"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2 border-b"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaBoxOpen className="text-2xl  mr-4" />
        {`Inventory (All Products)`}
      </NavLink>
      <NavLink
        to="/admin/panel/alldiscounts"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2 border-b"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <MdDiscount className="text-2xl  mr-4" />
        {`All Discounts`}
      </NavLink>
      <NavLink
        to="/admin/panel/createproducts"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2 border-b"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaPlusCircle className="text-2xl  mr-4" />
        Create Product Listing
      </NavLink>
      <NavLink
        to="/admin/panel/stockout/products"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaTimesCircle className="text-2xl  mr-4" />
        Stock Out Products
      </NavLink>
      <NavLink
        to="/admin/panel/deleted/products"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaTrash className="text-2xl  mr-4" />
        Deleted Products
      </NavLink>
      <NavLink
        to="/admin/panel/allcategories"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaListAlt className="text-2xl  mr-4" />
        All Categories List
      </NavLink>
      <NavLink
        to="/admin/panel/allReviews"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <MdReviews className="text-2xl  mr-4" />
        All Reviews List
      </NavLink>
      <NavLink
        to="/admin/panel/pending/orders"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaHourglassHalf className="text-2xl  mr-4" />
        Pending Orders
      </NavLink>
      <NavLink
        to="/admin/panel/confirmed/orders"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaCheckCircle className="text-2xl  mr-4" />
        Confirmed Orders
      </NavLink>
      <NavLink
        to="/admin/panel/delivered/orders"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <GiDeliveryDrone className="text-2xl  mr-4" />
        Delivered Orders
      </NavLink>
      <NavLink
        to="/admin/panel/deleted/orders"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaTrash className="text-2xl  mr-4" />
        Deleted Orders
      </NavLink>
      <NavLink
        to="/admin/panel/deliverycharge"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <TbTruckDelivery className="text-2xl  mr-4" />
        Delivery Charges
      </NavLink>
      <NavLink
        to="/admin/panel/tax"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <PiElevatorFill className="text-2xl  mr-4" />
        TAX Controll
      </NavLink>
      <NavLink
        to="/admin/panel/allcustomers"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaUsers className="text-2xl  mr-4" />
        All Customers Lists
      </NavLink>
      {/* <NavLink
        to="/admin/panel/alladmins"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaUserShield className="text-2xl  mr-4"/>
        All Admin Lists
      </NavLink>
      <NavLink
        to="/admin/panel/flashsales"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaBolt className="text-2xl  mr-4"/>
        Flash Sales
      </NavLink>
      <NavLink
        to="/admin/panel/offers"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaTags className="text-2xl  mr-4"/>
        Coupons / Offers
      </NavLink>
      <NavLink
        to="/admin/panel/reviews"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth px-4 py-4 flex items-center gap-2"
            : "hover:text-fourth px-4 py-4 flex items-center gap-2"
        }
      >
        <FaStar className="text-2xl  mr-4"/>
        Ratings & Reviews
      </NavLink> */}
    </>
  );

  return (
    <div className="bg-white rounded-lg">
      <div className="px-10 pt-10 pb-5 flex flex-col gap-5 font-semibold text-sm tracking-wide">
        {links}
      </div>
      <div className="px-10 pb-5 rounded-lg">
        <p
          onClick={handleLogout}
          className="text-2xl font-extrabold duration-700 hover:duration-700 border-4 text-white border-red-400 bg-red-400 text-center px-4 py-1 rounded-lg hover:text-black hover:bg-white hover:cursor-pointer"
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;
