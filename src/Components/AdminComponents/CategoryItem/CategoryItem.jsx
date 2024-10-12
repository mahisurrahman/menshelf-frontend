import React from "react";
import { AiFillForward } from "react-icons/ai";

const CategoryItem = ({ category, onRemoveCategory }) => {
  return (
    <div className="flex justify-between my-5 uppercase font-semibold border-b-2 py-2 items-center">
      <div className="">
        <h1 className="flex items-center gap-5">
          <AiFillForward className="text-2xl" />
          {category.categoryName}
        </h1>
      </div>
      <div className="">
        <button
          onClick={() => onRemoveCategory(category._id)}
          className="text-xs uppercase font-semibold text-red-500 py-1 px-4 rounded border-2 border-red-500 duration-700 hover:duration-700 hover:bg-red-500 hover:border-transparent hover:text-white"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
