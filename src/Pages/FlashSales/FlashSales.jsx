import React from "react";

const FlashSales = () => {
  return (
    <div className="bg-fifth">
      <div className="h-[40vh] bg-slate-100 flex items-center justify-center text-center">
        <div>
          <h1 className="text-6xl font-extrabold mb-4 tracking-wide">
            Flash Sales
          </h1>
          <p className="text-xl tracking-wide font-bold">{`Home > Others > Flash Sales`}</p>
        </div>
      </div>
      <div className="py-[8vh] px-[10vw] grid grid-cols-3 gap-10">
        <div className="border-2 bg-white rounded-lg">
          <div>
            <img
              className="rounded-t-lg"
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="py-5 px-4">
            <p className="font-extrabold tracking-wide mb-2">
              Limited Time Offer: Act Fast
            </p>
            <p className="font-extrabold tracking-wide mb-2">
              Offer Till:{" "}
              <span className="font-normal">25th February, 2024</span>
            </p>
            <p className="font-extrabold tracking-wide mb-2">
              Campaign Satus: <span className="font-normal">Over</span>
            </p>
            <p className="font-extrabold tracking-wide mb-2">
              Campaign Type On: <span className="font-normal">Percentage</span>
            </p>
            <p className="font-extrabold tracking-wide mb-2">
              Deals Rate: <span className="font-normal">25</span>
            </p>
          </div>
        </div>
        <div className="border-2 bg-white rounded-lg">
          <div>
            <img
              className="rounded-t-lg"
              src="https://images.unsplash.com/photo-1531303435785-3853ba035cda?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="py-5 px-4">
            <p className="font-extrabold tracking-wide mb-2">
              Limited Time Discounts
            </p>
            <p className="font-extrabold tracking-wide mb-2">
              Offer Till:{" "}
              <span className="font-normal">20th March, 2024</span>
            </p>
            <p className="font-extrabold tracking-wide mb-2">
              Campaign Satus: <span className="font-normal">Over</span>
            </p>
            <p className="font-extrabold tracking-wide mb-2">
              Campaign Type On: <span className="font-normal">Fixed Rate</span>
            </p>
            <p className="font-extrabold tracking-wide mb-2">
              Deals Rate: <span className="font-normal">15</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSales;
