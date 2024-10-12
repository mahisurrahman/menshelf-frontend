import React from "react";
import CategoryItem from "../CategoryItem/CategoryItem";

const AllCategoriesCompo = ({ allCategories, onRemoveCategory }) => {
  return (
    <div>
      {allCategories.map((category) => (
        <CategoryItem
          key={category._id}
          category={category}
          onRemoveCategory={onRemoveCategory}
        />
      ))}
    </div>
  );
};

export default AllCategoriesCompo;
