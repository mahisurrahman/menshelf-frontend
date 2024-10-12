const Ordernote = () => {
  return (
    <div className="my-5 rounded-lg shadow-xl px-10 py-10 bg-white">
      <div className="flex justify-between mb-4">
        <div className="flex justify-start gap-2 items-center">
          <p className="bg-fourth px-3 py-2 rounded-full text-white font-normal text-xs">
            4
          </p>
          <p className=" tracking-widest text-sm font-semibold">
            Order Note
          </p>
        </div>
      </div>
      <textarea
        name="orderNote"
        id=""
        className="text-sm border-2 tracking-widest w-full border-ninth px-4 py-2 rounded-md mt-2 focus:outline-none default:uppercase"
      ></textarea>
    </div>
  );
};

export default Ordernote;
