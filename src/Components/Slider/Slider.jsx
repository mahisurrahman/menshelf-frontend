import { Swiper, SwiperSlide } from "swiper/react";
import imageOne from "./imageOne.png";
import imageTwo from "./imageTwo.png";
import imageThree from "./imageThree.png";
import imageFour from "./imageFour.png";
import imageFive from "./imageNine.png";
import imageSix from "./imageSix.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slider.css";

import { FreeMode, Pagination } from "swiper/modules";

const Slider = () => {
  return (
    <div className="border-b py-6 px-10 bg-fourth">
      <>
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide className="rounded-lg">
            <div className="h-[24vh] w-full rounded-lg pl-10 grid grid-cols-2 items-center">
              <div className="flex flex-col items-start">
                <h1 className="text-primary text-xl font-extrabold text-left">
                  Premium Graded
                </h1>
                <p className="text-left text-sm text-primary font-semibold">
                  100% Satisfaction Guaranteed
                </p>
              </div>
              <div className="w-10/12">
                <img className="w-full" src={imageOne} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="rounded-lg">
            <div className="h-[24vh] w-full bg-white rounded-lg pl-10 grid grid-cols-2 items-center">
              <div className="flex flex-col items-start">
                <h1 className="text-primary text-xl font-extrabold text-left">
                  Imported Fabrics
                </h1>
                <p className="text-left text-sm text-primary font-semibold">
                  Comfortable Flexible and Long-Lasting
                </p>
              </div>
              <div className="w-10/12">
                <img className="w-full" src={imageTwo} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="rounded-lg">
            <div className="h-[24vh] w-full bg-white rounded-lg pl-10 grid grid-cols-2 items-center">
              <div className="flex flex-col items-start">
                <h1 className="text-primary text-xl font-extrabold text-left">
                  On-Time Delivery
                </h1>
                <p className="text-left text-sm text-primary font-semibold">
                  Deliver within 3 to 5 working Days
                </p>
              </div>
              <div className="w-10/12">
                <img className="w-full" src={imageThree} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="rounded-lg">
            <div className="h-[24vh] w-full rounded-lg pl-10 pr-5 grid grid-cols-2 items-center">
              <div className="flex flex-col items-start">
                <h1 className="text-primary text-xl font-extrabold text-left">
                  Return Policy
                </h1>
                <p className="text-left text-sm text-primary font-semibold">
                  Size Miss-Match will go for an Exchange
                </p>
              </div>
              <div className="w-10/12">
                <img className="w-full" src={imageFour} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="rounded-lg">
            <div className="h-[24vh] w-full rounded-lg pl-10 grid grid-cols-2 items-center">
              <div className="flex flex-col items-start">
                <h1 className="text-primary text-xl font-extrabold text-left">
                  Refund Policy
                </h1>
                <p className="text-left text-sm text-primary font-semibold">
                  Damaged Product on Arrival will get Refund
                </p>
              </div>
              <div className="w-10/12">
                <img className="w-full" src={imageFive} alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="rounded-lg">
            <div className="h-[24vh] w-full rounded-lg pl-10 grid grid-cols-2 items-center">
              <div className="flex flex-col items-start">
                <h1 className="text-primary text-xl font-extrabold text-left">
                  Offers & Sales
                </h1>
                <p className="text-left text-sm text-primary font-semibold">
                  Starting from 10% to 99% Sales keeps coming
                </p>
              </div>
              <div className="w-10/12">
                <img className="w-full" src={imageSix} alt="" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default Slider;
