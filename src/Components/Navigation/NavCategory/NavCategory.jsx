import React, { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const NavCategory = () => {
  const { allCategories } = useContext(AuthContext);
  console.log(allCategories);
  return (
    <div className="ml-6">
      <select className="px-2 py-2 bg-primary border-2 border-fourth rounded-lg focus:outline-none" id="categories" name="categories">
        {allCategories.map((category, index) => (
          <option className="" key={index} value={category.categoryName}>
            {category.categoryName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NavCategory;
