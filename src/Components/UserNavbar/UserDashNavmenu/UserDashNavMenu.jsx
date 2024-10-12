import { NavLink } from "react-router-dom";

const UserDashNavMenu = () => {
  const links = (
    <>
      <NavLink
        to="/user/dash"
        end
        className={({ isActive, isPending }) =>
          isPending
            ? ""
            : isActive
            ? "font-bold text-fourth"
            : "hover:text-fourth"
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/user/dash/cart"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth"
            : "hover:text-fourth"
        }
      >
        My Cart
      </NavLink>
      <NavLink
        to="/user/dash/orders"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth"
            : "hover:text-fourth"
        }
      >
        My Orders
      </NavLink>
      <NavLink
        to="/user/dash/reviews"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth"
            : "hover:text-fourth"
        }
      >
        My Reviews
      </NavLink>
      {/* <NavLink
        to="/user/dash/refunds"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth"
            : "hover:text-fourth"
        }
      >
        My Refund
      </NavLink> */}
      {/* <NavLink
        to="/my-reports"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "font-bold text-fourth"
            : "hover:text-fourth"
        }
      >
        My Reports
      </NavLink> */}
    </>
  );

  return (
    <div className="ml-10 mt-5 px-14 py-10 bg-white rounded-md flex flex-col gap-10 font-semibold text-lg tracking-wide">
      {links}
    </div>
  );
};

export default UserDashNavMenu;
