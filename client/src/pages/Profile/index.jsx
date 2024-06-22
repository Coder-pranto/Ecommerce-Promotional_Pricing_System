import AppDownload from "../../components/customers/AppDownload";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "react-query";

const Profile = () => {
  const sellerId = Cookies.get("sellerID");

  const {
    data: sellerInfo,
    isLoading,
    isError,
  } = useQuery("sellerData", async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/seller/all`
    );
    return response?.data?.data?.find((seller) => seller._id === sellerId);
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching seller data</div>;

  const formattedPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "Contact number not provided";
    const hasCountryCode = phoneNumber.startsWith("88");
    if (hasCountryCode) {
      const countryCode = phoneNumber.slice(0, 3); // Extract country code '880'
      const firstPart = phoneNumber.slice(3, 7); // Extract first part '1813'
      const secondPart = phoneNumber.slice(7); // Extract second part '320587'
      return `+${countryCode} ${firstPart}-${secondPart}`;
    } else {
      const countryCode = "880";
      const firstPart = phoneNumber.slice(1, 4); // Extract first part '1813'
      const secondPart = phoneNumber.slice(4); // Extract second part '320587'
      return `+${countryCode} ${firstPart}-${secondPart}`;
    }
  };

  return (
    <>
      <div className="w-full mx-auto mt-5">
        <span className="font-bold text-gray-500">Home &gt;</span>
        <span className="font-bold text-primary"> Profile</span>
      </div>

      <div className="mx-auto mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl text-primary font-bold italic">Profile</h2>
          </div>
          <div>
            <Link to="/seller-dashboard">
              <button className="w-52 xs:w-40 p-2.5 xs:p-1.5 text-white bg-primary hover:bg-secondary rounded-lg mt-4 md:mt-0">
                Seller Dashboard
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="w-40 md:w-1/5">
            <img
              src={`https://api.discounthutdeshit.tailormaster.xyz/${sellerInfo?.shopLogo || "uploads/userdummy.png"
                }`}
              alt="user-image"
              className="w-full border-2 border-primary rounded-full"
            />
          </div>
        </div>

        <section className="flex flex-col md:flex-row justify-between border-2 border-slate-400 p-2 rounded-lg mt-8">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Personal Information</h2>
            <div className="mb-2">
              <h2 className="font-bold text-sm">Name</h2>
              <h3 className="text-md">{sellerInfo.shopName}</h3>
            </div>
            <div className="mt-2">
              <h2 className="font-bold text-sm">Email</h2>
              <h3 className="text-md"> {sellerInfo?.email}</h3>
            </div>
            <div className="mt-2 mb-2">
              <h2 className="font-bold text-sm">Mobile</h2>
              {/* <h3 className="text-md">+880 1813-320587</h3> */}
              <h3 className="text-md">
                {formattedPhoneNumber(sellerInfo?.phone)}
              </h3>
            </div>
          </div>
          <div className="p-4">
            <Link
              to="/profile_edit"
              className="bg-primary hover:bg-secondary w-full md:w-auto p-2 text-white rounded-lg"
            >
              Edit Profile
            </Link>
          </div>
        </section>
      </div>

      {/* AppDownload section  */}

      <AppDownload />
    </>
  );
};

export default Profile;
