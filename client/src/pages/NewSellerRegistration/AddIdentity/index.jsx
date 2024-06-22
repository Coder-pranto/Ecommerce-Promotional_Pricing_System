/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import ImageUploadField from "../../../components/Forms/ImageUploadField";
import toast from "react-hot-toast";
import { useUpdateMutation } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AddIdentity({
  setCurrentStep,
  setCompleteStep,
  sellerId,
}) {
  const navigate = useNavigate();

  const token = Cookies.get("token");

  const addIdentityUpdateMutation = useUpdateMutation(
    "addIdentity",
    "/seller/add-identity",
    token
  );

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.tradeLicense.length === 0) {
      const identityImageFiles = [data.nidFront[0], data.nidBack[0]];
      identityImageFiles.forEach((file) => {
        formData.append("identityImage", file);
      });
      formData.append("identityType", "nid");
    } else {
      const payload = {
        identityType: "tradeLicense",
        identityImage: data.tradeLicense[0],
      };

      for (let key in payload) {
        formData.append(key, payload[key]);
      }
    }

    try {
      const response = await addIdentityUpdateMutation.mutateAsync({
        id: sellerId,
        updatedData: formData,
      });
      if (response.status === 200) {
        navigate("/");
        Cookies.set("isSeller", true, { sameSite: "None", secure: true });
        Cookies.set("sellerID", sellerId, { sameSite: "None", secure: true });
        // toast.success("Seller apply successfull! wait for approved");
        toast.success("Seller application approved successfull!");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div>
      <h2 className="mt-5 sm:text-xl xs:text-md font-bold">NID Uploads</h2>
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-2 border-[#aaa] p-4 px-6 rounded-lg flex sm:flex-row xs:flex-col justify-between sm:gap-0 xs:gap-3">
            <div className="border-2 border-[#aaa] p-4 sm:w-[48%] xs:w-full rounded-lg">
              <ImageUploadField
                label="NID Card Front Part"
                name="nidFront"
                register={register}
              />
            </div>
            <div className="border-2 border-[#aaa] p-4 sm:w-[48%] xs:w-full rounded-lg">
              <ImageUploadField
                label="NID Card Back Part"
                name="nidBack"
                register={register}
              />
            </div>
          </div>
          <h2 className="my-5 sm:text-xl xs:text-md font-bold">
            Trade License Uploads
          </h2>
          <div className="border-2 border-[#aaa] p-4 rounded-lg flex justify-center">
            <div className="border-2 border-[#aaa] p-4 sm:w-[48%] xs:w-full rounded-lg">
              <ImageUploadField
                label="Trade License"
                name="tradeLicense"
                register={register}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-primary text-white py-[2px] px-4 rounded-md my-5 hover:bg-secondary"
              onClick={() => {
                setCurrentStep(2);
                setCompleteStep(1);
              }}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-primary text-white py-[2px] px-4 rounded-md my-5 hover:bg-secondary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
