import InputField from "../../Forms/InputField";
import SelectOption from "../../Forms/SelectOptions";
import { districtQuery } from "../../../utils/districtApi";
import CheckBox from "../../Forms/CheckBox";
import { useDataQuery } from "../../../utils/api";
import { useEffect } from "react";

export default function ContactForm({
  register,
  handleSubmit,
  errors,
  handleOrderSubmit,
  loading,
  checked,
  setChecked,
  userId,
  reset,
}) {
  const { data } = districtQuery(
    "district",
    "https://bdapis.com/api/v1.1/districts/"
  );

  const districts = data?.data?.data;

  const { data: users } = useDataQuery("sellerData", "/customer");
  const user = users?.data?.data?.find((customer) => customer?._id === userId);
  // console.log(user);

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name,
        email: user?.email,
        phoneNumber: user?.phone,
      });
    }
  }, [user]);

  const handleCheck = (e) => {
    {
      setChecked(e.target.checked);
      e.target.checked
        ? reset({
            name: "",
            email: "",
            phoneNumber: "",
          })
        : reset({
            name: user?.name,
            email: user?.email,
            phoneNumber: user?.phone,
          });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleOrderSubmit)}
      className="flex flex-col gap-5"
    >
      {/* Contact */}
      <div>
        <h3 className="text-xl">Contact Information</h3>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <InputField
            label="Name"
            name="name"
            register={register}
            error={errors?.name}
            defaultValue={user?.name}
            className="rounded-md outline-1 outline-primary"
            disabled={!checked}
          />
          <InputField
            label="Email Address"
            name="email"
            register={register}
            error={errors?.email}
            defaultValue={user?.email}
            className="rounded-md outline-1 outline-primary"
            disabled={!checked}
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            register={register}
            error={errors?.phoneNumber}
            defaultValue={user?.phone}
            className="rounded-md outline-1 outline-primary"
            disabled={!checked}
          />
        </div>
        <CheckBox
          label="Order for another person"
          name="checkForAnotherPerson"
          type="checkbox"
          register={register}
          error={errors?.checkForAnotherPerson}
          onChange={(e) => handleCheck(e)}
        />
      </div>

      {/* Delivery */}
      <div>
        <h3 className="text-xl">Delivery Information</h3>
        <div className="mt-3">
          <InputField
            label="Address"
            name="address"
            register={register}
            error={errors?.address}
            className="rounded-md outline-1 outline-primary"
          />
          <SelectOption
            label="District"
            name="district"
            register={register}
            error={errors?.district}
            options={districts}
            className="rounded-md outline-1 outline-primary"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-secondary via-[rgba(109, 183, 199, 0.8)] to-[#6DB7C7CC] py-2 text-white rounded-md text-lg font-medium"
      >
        {loading ? "Order in process ..." : "Order"}
      </button>
    </form>
  );
}
