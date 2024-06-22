import { AiOutlineApple } from "react-icons/ai";
import { PiGooglePlayLogoLight } from "react-icons/pi";

const AppDownload = () => {
  const baseURL = "";
  return (
    <div className="mt-[300px] mb-[1050px] sm:mb-[700px] md:mb-[600px] lg:mb-[400px]">
      <div className="relative rounded-xl bg-primary lg:w-full xs:w-[100%] lg:h-96 xs:h-[670px] z-2">
        <img
          src={`${baseURL}/app.png`}
          className="absolute transform translate-x-10 lg:left-32 lg:bottom-12 xs:bottom-[340px] w-60 rounded-l-lg z-10"
          alt="mobile_image"
        />

        <div className="absolute text-center p-4 lg:right-2  lg:ml-[56%] lg:mr-[12%] lg:top-20 xs:top-[400px] ">
          <p className="text-white font-extrabold lg:text-5xl xs:text-[120%] mb-4">
            Download Our Mobile App{" "}
          </p>
          <button className="bg-black inline rounded-xl text-white items-center px-3 py-2 mr-2 mt-2">
            <PiGooglePlayLogoLight size="25px" className="inline" />
            Play Store
          </button>
          <button className="bg-black inline rounded-xl text-white items-center px-3 py-2 mt-2">
            <AiOutlineApple size="25px" className="inline" /> App Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
