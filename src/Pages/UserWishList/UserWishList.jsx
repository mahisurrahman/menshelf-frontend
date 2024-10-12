import WishListItems from "../../Components/UserWishListItems/WishListItems/WishListItems";


const UserWishList = () => {
    return (
        <div className=" py-10 px-10 bg-white w-full rounded-md">
            <div className="flex justify-center items-center font-bold text-2xl">
                <h1>My WishLists</h1>
            </div>
            <div className="mt-5 h-[80vh] overflow-y-scroll">
            <WishListItems></WishListItems>
            <WishListItems></WishListItems>
            <WishListItems></WishListItems>
            <WishListItems></WishListItems>
            <WishListItems></WishListItems>
            <WishListItems></WishListItems>
            <WishListItems></WishListItems>
            <WishListItems></WishListItems>
            <WishListItems></WishListItems>
            </div>
        </div>
    );
};

export default UserWishList;