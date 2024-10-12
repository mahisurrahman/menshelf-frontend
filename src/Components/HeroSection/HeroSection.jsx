import React from "react";
import "./HeroSection.css";
import { CiSearch } from "react-icons/ci";

const HeroSection = () => {
  return (
    <div className="bgImage h-[35vh] flex items-center justify-center">
      <div className="w-full h-[94vh] bg-primary bg-opacity-60 flex flex-col items-center justify-center ">
        <div className="flex items-center justify-center ">
          <h1 className="text-center text-white text-5xl  font-bold">
            Get Desired Items, <br />
            Right At Your Door-Steps !!!
          </h1>
        </div>
        <div className="my-4">
          {/* <p className="text-center text-md tracking-widest  text-fourth font-semibold">
            Remember, Window Shopping is Free for Everyone, so Don't Hesitate{" "}
            <br /> to Check Our Best Collections.
          </p> */}
        </div>
        {/* <div className="w-full flex justify-center items-center mt-5">
          <input
            className="w-5/12 text-xl py-4 px-5 rounded-s-md placeholder:text-sm focus:outline-none"
            type="text"
            name="product"
            placeholder="Search Your Products From Here"
            id=""
          />
          <div className="flex items-center bg-fourth rounded-e-md px-5 hover:bg-primary duration-700 hover:duration-700 hover:cursor-pointer">
            <CiSearch className="text-2xl text-white"></CiSearch>
            <input
              className="hover:bg-primary w-full bg-fourth text-xl py-4 pl-2 pr-5 font-semibold text-white rounded-e-md duration-700 hover:duration-700 hover:cursor-pointer"
              type="submit"
              value="Search"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
