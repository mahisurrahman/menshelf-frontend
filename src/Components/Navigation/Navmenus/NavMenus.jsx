import { NavLink } from "react-router-dom";

const NavMenus = () => {
  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "" : isActive ? "font-bold text-primary" : "hover:text-primary"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/branches"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "font-bold text-primary" : "hover:text-primary"
        }
      >
        Branches
      </NavLink>
      <NavLink
        to="/offers"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "font-bold text-primary" : "hover:text-primary"
        }
      >
        Offers
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "font-bold text-primary" : "hover:text-primary"
        }
      >
        Contact
      </NavLink>
    </>
  );
  return <div className="flex items-center text-[18px] gap-5 font-normal">{links}</div>;
};

export default NavMenus;
