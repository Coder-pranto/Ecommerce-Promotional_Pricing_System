/* eslint-disable react/prop-types */
const CouponCard = ({ image }) => {
  const details =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, molestiae quo. Iure expedita cumque reiciendis quibusdam labore dolorum alias nulla?";
  return (
    <div className="md:w-1/2 h-[300px] md:h-[400px] relative overflow-hidden rounded-lg shadow-lg bg-white z-10">
      <img
        className="w-full h-[180px] md:h-[250px] object-cover bg-no-repeat"
        src={`./coupon/${image}`}
        alt="Banner"
      />
      <div className="px-6 py-4 md:mt-12 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-sm md:text-lg mb-2">
            FLASH OFF 30%
          </h2>
          <p className="text-gray-600 md:text-sm text-xs font-regular">
            {details.slice(0, 60)}
          </p>
        </div>
        <button className="bg-primary text-white font-bold py-2 px-4 rounded-md">
          Details
        </button>
      </div>

      <div className="hidden  lg:block">
        <div className="absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-3 z-20 text-primary">
          <div className="w-20 h-20 xl:w-24 xl:h-24 p-2 bg-white border-2 border-primary text-center rounded-lg flex items-center justify-center ">
            {" "}
            <p>21 Days</p>
          </div>
          <div className="w-20 h-20 xl:w-24 xl:h-24 p-2 bg-white border-2 border-primary text-center rounded-lg flex items-center justify-center">
            {" "}
            <p>14 Hours</p>
          </div>
          <div className="w-20 h-20 xl:w-24 xl:h-24 p-2 bg-white border-2 border-primary text-center rounded-lg flex items-center justify-center">
            {" "}
            <p>34 Minutes</p>
          </div>
          <div className="w-20 h-20 xl:w-24 xl:h-24 p-2 bg-white border-2 border-primary text-center rounded-lg flex items-center justify-center">
            {" "}
            <p>45 Seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;

{
  /* <div className="w-1/2 relative mx-auto rounded-lg overflow-hidden shadow-lg bg-white z-10">
<img className="w-full" src="./coupon/coupon2.png" alt="Banner" />
<div className="px-6 py-4 mt-12">
  <div className="font-bold text-xl mb-2">FLASH OFF 30%</div>
  <p className="text-gray-600 text-base font-bold">
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Voluptatum, molestiae quo. Iure expedita cumque reiciendis
    quibusdam labore dolorum alias nulla?
  </p>
</div>

<div className="xs:hidden lg:block">
  <div className="absolute lg:top-[40%] xl:top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-3 z-20 text-orange-500">
    <div className="w-24 bg-white border-2 border-orange-400 text-center rounded-lg h-24 flex items-center justify-center">
      {" "}
      <p>21 Days</p>
    </div>
    <div className="w-24 bg-white border-2 border-orange-400 text-center rounded-lg h-24 flex items-center justify-center">
      {" "}
      <p>14 Hours</p>
    </div>
    <div className="w-24 bg-white border-2 border-orange-400 text-center rounded-lg h-24 flex items-center justify-center">
      {" "}
      <p>34 Minutes</p>
    </div>
    <div className="w-24 bg-white border-2 border-orange-400 text-center rounded-lg h-24 flex items-center justify-center">
      {" "}
      <p>45 Seconds</p>
    </div>
  </div>
</div>

<div className="px-6 py-4 flex justify-end items-center">
  <button className="bg-[#ec4f22] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md">
    Details
  </button>
</div>
</div> */
}
