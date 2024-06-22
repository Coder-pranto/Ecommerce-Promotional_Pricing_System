import AppDownload from "../../components/customers/AppDownload";

export default function ProfileEdit() {
  return (
    <>
      <div className="w-full mx-auto mt-5">
        <span className="font-bold text-gray-500">Home &gt;</span>
        <span className="font-bold text-primary"> Edit Profile</span>
      </div>

      <div className="w-full px-4 mt-8 md:px-0 md:mx-auto">
        <div className="text-xl text-primary font-bold mb-4">Edit Profile</div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <label htmlFor="name" className="block font-semibold mb-1">
              Shop Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full border rounded-lg p-2"
              placeholder="Name"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="email" className="block font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border rounded-lg p-2"
              placeholder="Email"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="mobile" className="block font-semibold mb-1">
              Mobile Number:
            </label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              className="w-full border rounded-lg p-2"
              placeholder="Mobile Number"
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className="w-20 p-2 bg-primary hover:bg-secondary text-white rounded-lg">
            Save
          </button>
        </div>
      </div>

      {/* AppDownload section  */}

      <AppDownload />
    </>
  );
}
