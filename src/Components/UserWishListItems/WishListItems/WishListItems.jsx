import { FaStar } from "react-icons/fa6";

const WishListItems = () => {
  return (
    <div className="my-20 flex justify-between items-center px-10">
      <div className="flex gap-5 items-center">
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1689643577385-57af0aba150e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-20 h-20"
            alt=""
          />
        </div>
        <div>
          <h1 className="font-extrabold text-lg">Yellow T-Shirt</h1>
          <p className="font-semibold">Grocery Shop</p>
          <div className="flex items-center justify-center w-[60px] rounded-md mt-1 gap-1 bg-seventh text-white">
            <p>3.3 </p>
            <FaStar className="text-xs"></FaStar>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-end">
        <div className="border-e-2 pr-5 font-bold text-seventh hover:text-secondary">
            <button>Add to Cart</button>
        </div>
        <div className="pl-5">
            <p className="text-xl font-bold">$ <span>0.60</span></p>
            <button className="text-lg text-tenth font-semibold hover:text-secondary">Remove</button>
        </div>
      </div>
    </div>
  );
};

export default WishListItems;
