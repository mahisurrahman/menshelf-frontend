import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

const CategorySideBar = ({ allCategories, handleCategoryClick }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="bg-fourth py-8 px-2 h-full">
      <div className="text-white font-bold">
        {allCategories.map((category) => (
          <div
            onClick={() => handleCategoryClick(category)}
            key={category._id}
            className="pl-10 text-left py-4 flex items-center gap-4"
          >
            <p>
              <AiFillPlusCircle className="text-xl"></AiFillPlusCircle>
            </p>
            <button className="text-[14px] tracking-wider duration-700 hover:duration-700 hover:scale-110">
              {capitalizeFirstLetter(category.categoryName)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySideBar;
