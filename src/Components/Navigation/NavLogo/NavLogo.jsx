import React from "react";
import logo from "./man.png";
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <Link to="/">
      <div className="flex gap-4 items-center">
        <img className="w-12" src={logo} alt="" />
        <h1 className="text-2xl font-light text-white">
          Men's <span className="font-extrabold text-white"> Shelf</span>
        </h1>
      </div>
    </Link>
  );
};

export default NavLogo;
