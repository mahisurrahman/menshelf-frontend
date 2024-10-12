import { useEffect, useState } from "react";
import useRequest from "../../ApiServices/useRequest";
import AllCategoriesCompo from "../../Components/AdminComponents/AllCategoriesCompo/AllCategoriesCompo";
import CategoryModal from "../../Components/AdminComponents/CategoryModal/CategoryModal";

const AdminAllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [postRequest, getRequest] = useRequest();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getAllCateoriesFnc = async () => {
    try {
      const allCats = await getRequest("/categories/src");
      setAllCategories(allCats?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewCategory = async (categoryName, categoryCode) => {
    try {
      const categoryDetails = {
        categoryName: categoryName,
        categoryCode: categoryCode,
      };
      const crtCategory = await postRequest("/categories/crt", categoryDetails);
      if (crtCategory?.data?.data.status === 200) {
        const getCategories = await getRequest("/categories/src");
        setAllCategories(getCategories?.data?.data);
      }
      getAllCateoriesFnc();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCategory = async (categoryId) => {
    try {
      const remvCat = await postRequest(`/categories/del/byId/${categoryId}`);
      if (remvCat) {
        console.log("hi");
        const getCats = await getRequest("/categories/src");
        setAllCategories(getCats?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCateoriesFnc();
  }, []);

  return (
    <div className="px-10 py-10 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold">Admin All Categories</h1>
        <button
          onClick={() => setIsModalVisible(true)}
          className="text-sm font-extrabold px-4 py-2 bg-green-500 text-white rounded-lg duration-700 hover:duration-700 hover:bg-green-800"
        >
          Add New
        </button>
      </div>
      <div className="mt-10">
        {allCategories.length <= 0 ? (
          <p>No Categories Available</p>
        ) : (
          <AllCategoriesCompo
            allCategories={allCategories}
            onRemoveCategory={handleRemoveCategory}
          />
        )}
      </div>
      <CategoryModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleAddNewCategory}
      />
    </div>
  );
};

export default AdminAllCategories;
