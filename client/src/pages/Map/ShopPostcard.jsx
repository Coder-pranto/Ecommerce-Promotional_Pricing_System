const ShopPostCard = () => {
  return (
    <div className="w-full rounded-lg shadow-lg bg-white p-2">
      <div className="relative">
        <img
          className="w-full rounded-t-md"
          src="./product/xiaomi.png"
          alt="Banner"
        />
        <div className="absolute lg:w-12 xs:w-8 bottom-0 right-0 mb-2 mr-2 p-1 bg-[#ec4f11] rounded-full">
          <span className="text-white lg:text-base xs:text-[8px]"> -30% </span>
        </div>
      </div>

      <div className="lg:px-3 lg:py-0.5 xs:px-2 xs:py-0.25 mb-2">
        <div className="font-bold lg:text-base xs:text-sm text-slate-600 lg:mb-1 xs:mb-0.5">
          Xiaomi
        </div>
        <p className="text-slate-500 lg:text-base xs:text-[10px] lg:mb-0.5 xs:mb-0">
          {" "}
          Xiaomi Smart Watch 42mm{" "}
        </p>
        <span className="font-bold lg:text-lg xs:text-base text-black">
          Tk 2000
        </span>
        <span className="text-gray-400 lg:text-lg xs:text-base line-through ml-1">
          Tk 2500
        </span>
      </div>
    </div>
  );
};

export default ShopPostCard;
