// import paymentWayImg from '../../../assets/test-image/payment.png';
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const baseURL = "";
  const year = new Date(Date.now()).getFullYear();
  return (
    <footer className="absolute bottom-0 w-[100vw] bg-primary text-white pt-12 pb-4 px-4">
      <div className="container overflow-hidden flex flex-col lg:flex-row justify-between mx-auto px-4">
        <div className="w-56">
          <img
            src={`${baseURL}/DiscountHutWhite.svg`}
            className="w-56 pb-5"
            alt="logo"
          />
          <p className="text-justify">
            Largest product discount advertisement,search engine, maximum
            categorized online shopping mall.
          </p>
        </div>
        <div className="w-3/4 block sm:flex text-sm mt-6 lg:mt-0">
          <ul className="text-gray-700 list-none p-0 font-thin flex flex-col text-left w-full">
            <li className="inline-block py-2 px-3 font-bold text-white uppercase tracking-wide">
              Let us Help You
            </li>
            <li>
              <Link
                to="/profile"
                className="inline-block py-2 pl-3 pr-5 text-white no-underline "
              >
                Your Account
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="inline-block py-2 pl-3 pr-5 text-white no-underline"
              >
                Coupons
              </a>
            </li>
            <li>
              <Link
                to="/terms"
                className="inline-block py-2 pl-3 pr-5 text-white no-underline"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="inline-block py-2 pl-3 pr-5 text-white no-underline"
              >
                FAQ
              </Link>
            </li>
          </ul>
          <ul className="text-gray-700 list-none p-0 font-thin flex flex-col text-left w-full">
            <li className="inline-block py-2 px-3 font-bold text-white uppercase  tracking-wide">
              Contact Us
            </li>
            <li>
              <a
                href="#"
                className="inline-block py-2 pl-3 pr-5 text-white no-underline"
              >
                D/36, Block-E,Lalmatiya,Dhaka-1207
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block py-2 pl-3 pr-5 text-white no-underline"
              >
                Call us : +880 1537-570379
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block py-2 pl-3 pr-5 text-white no-underline"
              >
                Email us : support@discounthut.com
              </a>
            </li>
            <li>
              <div className="py-2 pl-3 pr-5 text-white no-underline">
                <Link
                  target="_blank"
                  to="https://www.facebook.com/profile.php?id=61550104035538"
                >
                  <FaFacebook size="25px" color="#fff" className="inline" />
                </Link>
                <Link
                  target="_blank"
                  to="https://www.youtube.com/channel/UCfl28lcr34idTpOHPOxlFlQ"
                >
                  <FaYoutube size="25px" color="fff" className="inline ml-4" />
                </Link>
                <Link
                  target="_blank"
                  to="https://www.linkedin.com/company/discounthut-bd/"
                >
                  <FaLinkedin size="25px" color="fff" className="inline ml-4" />
                </Link>
              </div>
            </li>
          </ul>
          <div className="text-gray-700 flex flex-col w-full">
            <div className="inline-block py-2 px-3 font-bold text-white uppercase tracking-wide">
              We accepts
            </div>
            <div className="flex flex-wrap justify-start mt-2 px-2">
              {/* <div className='flex flex-wrap justify-start mt-2 px-2'>
                <img src={paymentWayImg} alt='paymentWayImage' />
              </div> */}
              <a
                className=" flex items-center justify-center w-1/8 p-1 no-underline"
                href="#"
              >
                <img
                  className="h-11 w-11 rounded-lg bg-white"
                  src={`${baseURL}/footerLogo/bkash.png`}
                  alt=""
                />
              </a>
              <a
                className=" flex items-center justify-center w-1/8 p-1 no-underline"
                href="#"
              >
                <img
                  className="h-11 w-11 rounded-lg"
                  src={`${baseURL}/footerLogo/rocket.png`}
                  alt=""
                />
              </a>
              <a
                className=" flex items-center justify-center w-1/8 p-1 no-underline"
                href="#"
              >
                <img
                  className="h-11 w-11 rounded-lg bg-white"
                  src={`${baseURL}/footerLogo/nagad.png`}
                  alt=""
                />
              </a>
              <a
                className="flex items-center justify-center w-1/8 p-1 no-underline"
                href="#"
              >
                <img
                  className="h-11 w-11 rounded-lg"
                  src={`${baseURL}/footerLogo/upay.png`}
                  alt=""
                />
              </a>
              <a
                className="flex items-center justify-center w-1/8 p-1 no-underline"
                href="#"
              >
                <img
                  className="h-11 w-11 rounded-lg"
                  src={`${baseURL}/footerLogo/abbank.png`}
                  alt=""
                />
              </a>
              <a
                className="flex items-center justify-center w-1/8 p-1 no-underline"
                href="#"
              >
                <img
                  className="h-11 w-11 rounded-lg  bg-white"
                  src={`${baseURL}/footerLogo/dbbl.png`}
                  alt=""
                />
              </a>
              <a
                className="flex items-center justify-center w-1/8 p-1 no-underline"
                href="#"
              >
                <img
                  className="h-11 w-11 rounded-lg  bg-white"
                  src={`${baseURL}/footerLogo/brac.png`}
                  alt=""
                />
              </a>
              <a
                className="flex items-center justify-center w-1/8 p-1 no-underline"
                href="#"
              >
                <img
                  className="h-11 w-11 rounded-lg bg-white"
                  src={`${baseURL}/footerLogo/visa.png`}
                  alt=""
                />
              </a>
              <a
                className="flex items-center justify-center w-1/8 p-1 no-underline"
                href="#"
              >
                <img
                  className="h-11 w-11 rounded-lg  bg-white"
                  src={`${baseURL}/footerLogo/mastercard.png`}
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t border-white flex flex-col md:flex-row justify-center items-center">
        {/* shifat */}
        <span className="mt-4 text-secondary">
          Copyright © {year} Discounthut.com. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
