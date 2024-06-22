/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../components/Forms/InputField";
import SelectOption from "../../../components/Forms/SelectOptions";
import {
  useCreateMutation,
  useDataQuery,
  useUpdateMutation,
} from "../../../utils/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AddAddress({
  setCurrentStep,
  setCompleteStep,
  sellerId,
}) {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [districts, setDistricts] = useState([]);
  const [shoppingMallValue, setShoppingMallValue] = useState("");
  const [selectedShoppingMall, setSelectedShoppingMall] = useState("");
  const [mallSelected, setMallSelected] = useState(true);

  const { data: shoppingMallData } = useDataQuery("shopping-mall", "/mall/all");
  const shoppingMalls = shoppingMallData?.data?.data;

  // filtering shopping mall that exists or not and showing suggestion based on that
  const filteredShoppingMalls = shoppingMalls?.filter((mall) => {
    if (!shoppingMallValue) return;

    return mall?.shoppingMallName
      .toLowerCase()
      .trim()
      .includes(shoppingMallValue.toLowerCase().trim());
  });
  // console.log(filteredShoppingMalls);

  // form schema
  const schema = yup.object().shape({
    division: yup.string().required("Division is required"),
    area: yup.string().required("Area is required"),
    city: yup.string().required("City is required"),
    shoppingMall: yup.string().min(1, "Can not be empty"),
    exactLocation: yup.string().required("Exact Location is required"),
  });

  const token = Cookies.get("token");

  // dumy division, area, city
  const divisions = [
    "Dhaka",
    "Chattogram",
    "Sylhet",
    "Khulna",
    "Barisal",
    "Rangpur",
    "Rajshahi",
    "Mymansign",
  ];

  const dhakaDistricts = [
    "Dhaka",
    "Gazipur",
    "Kishoreganj",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Tangail",
    "Faridpur",
    "Gopalganj",
    "Madaripur",
    "Rajbari",
    "Shariatpur",
  ];
  const chattogramDistricts = [
    "Chittagong",
    "Brahmanbaria",
    "Comilla",
    "Chandpur",
    "Lakshmipur",
    "	Maijdee",
    "Feni",
    "Khagrachhari",
    "Rangamati",
    "Bandarban",
    "Cox's Bazar",
  ];
  const barisalDistricts = [
    "Barisal",
    "Barguna",
    "Bhola",
    "Jhalokati",
    "Patuakhali",
    "Pirojpur",
  ];
  const khulnaDistricts = [
    "Bagerhat",
    "Chuadanga",
    "Jashore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ];
  const rajshahiDistricts = [
    "Natore",
    "Rajshahi",
    "Sirajganj",
    "Pabna",
    "Bogura",
    "Chapainawabganj",
    "Naogaon",
    "Joypurhat",
  ];
  const rangpurDistricts = [
    "Dinajpur",
    "Kurigram",
    "Gaibandha",
    "Lalmonirhat",
    "Nilphamari",
    "	Panchagarh",
    "Rangpur",
    "Thakurgaon",
  ];
  const mymensinghDistricts = [
    "Mymensingh",
    "Jamalpur",
    "Netrokona",
    "Sherpur",
  ];
  const sylhetDistricts = ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"];

  useEffect(() => {
    switch (selectedDivision) {
      case "Dhaka":
        setDistricts(dhakaDistricts);
        break;
      case "Chattogram":
        setDistricts(chattogramDistricts);
        break;
      case "Sylhet":
        setDistricts(sylhetDistricts);
        break;
      case "Khulna":
        setDistricts(khulnaDistricts);
        break;
      case "Barisal":
        setDistricts(barisalDistricts);
        break;
      case "Rangpur":
        setDistricts(rangpurDistricts);
        break;
      case "Rajshahi":
        setDistricts(rajshahiDistricts);
        break;
      case "Mymansign":
        setDistricts(mymensinghDistricts);
        break;
      default:
        setDistricts(dhakaDistricts);
        break;
    }
  }, [selectedDivision]);

  const {
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // handling mall input
  const handleMallChange = (e) => {
    setShoppingMallValue(e.target.value);
    setMallSelected(false);
  };

  // handling selectedShopping mall
  const handleSelectedShoppingMall = (shoppingMallName) => {
    setSelectedShoppingMall(shoppingMallName);
    reset({ shoppingMall: shoppingMallName });
    setMallSelected(true);
  };
  // console.log(selectedShoppingMall);

  const sellerAddAddressUpdateMutation = useUpdateMutation(
    "addAddress",
    "/seller/add-address",
    token
  );

  // creating new shopping mall
  const creatingNewShoppingMall = useCreateMutation(
    "new-shopping-mall",
    "/mall"
  );

  // // checking if the mall exists
  // const newShoppingMall = filteredShoppingMalls?.map((mall) => {
  //   const trueOr = mall?.shoppingMallName.includes(selectedShoppingMall);
  //   console.log(trueOr);
  // });

  // console.log(newShoppingMall);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = watch();
    const shopAddress = {
      shopAddress: `${data.exactLocation}, ${data.area}, ${data.division}, ${data.shoppingMall}`,
    };

    const response = await sellerAddAddressUpdateMutation.mutateAsync({
      id: sellerId,
      updatedData: shopAddress,
    });

    // if the selected mall doesn't exists creating new shopping mall
    const responseNewMall = await creatingNewShoppingMall.mutateAsync({
      shoppingMallName: selectedShoppingMall,
    });
    if (responseNewMall.status === 201)
      toast.success("New Shopping mall created");

    if (response.status === 200) {
      setCurrentStep(3);
      setCompleteStep(2);
      toast.success("Please provide identity!");
    } else {
      toast.error("Failed! Try after sometime");
    }
  };

  return (
    <div>
      <h2 className="mt-5 md:text-xl xs:text-md font-bold">Business Address</h2>
      <div className="mt-5">
        <form>
          <div className="flex justify-between">
            <div className="w-[48%]">
              <SelectOption
                label="Select Division"
                name="division"
                options={divisions}
                register={register}
                error={errors?.division}
                onChange={(e) => setSelectedDivision(e.target.value)}
              />
              <InputField
                label="Area"
                name="area"
                register={register}
                error={errors?.area}
                placeholder="Enter your area"
              />
              <InputField
                label="Exact Location"
                name="exactLocation"
                register={register}
                error={errors?.exactLocation}
                placeholder="Ex: D-36, Jakir hossen road"
              />
            </div>
            <div className="w-[48%]">
              <SelectOption
                label="Select City"
                name="city"
                options={districts}
                register={register}
                error={errors?.city}
              />
              {/* This is for suggetion on shopping mall */}
              <div className="flex flex-col">
                <InputField
                  label="Shopping Mall Name"
                  name="shoppingMall"
                  register={register}
                  defaultValue={selectedShoppingMall}
                  onChange={(e) => handleMallChange(e)}
                  placeholder="Enter shopping mall name"
                  error={errors?.shoppingMall}
                />
                {filteredShoppingMalls?.length && mallSelected === false ? (
                  <div>
                    {filteredShoppingMalls?.map((mall) => (
                      <div
                        className="bg-slate-50 w-full p-2 flex flex-col gap-3 cursor-pointer"
                        key={mall?._id}
                        onClick={() =>
                          handleSelectedShoppingMall(mall?.shoppingMallName)
                        }
                      >
                        <span>{mall?.shoppingMallName}</span>
                      </div>
                    ))}
                  </div>
                ) : mallSelected === false && shoppingMallValue?.length ? (
                  <div
                    className="flex items-center justify-between bg-slate-50 w-full p-2 cursor-pointer"
                    onClick={() =>
                      handleSelectedShoppingMall(shoppingMallValue)
                    }
                  >
                    <span>{shoppingMallValue}</span>
                    <span>+ Add a new mall</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* This is for suggetion on shopping mall end */}
            </div>
          </div>
          <div className="flex justify-end gap-2 my-3">
            <button
              type="button"
              className="bg-primary text-white py-[2px] px-4 rounded-md hover:bg-secondary"
              onClick={() => {
                setCurrentStep(1);
                setCompleteStep(0);
              }}
            >
              Back
            </button>
            <button
              type="submit"
              onClick={handleFormSubmit}
              className="bg-primary text-white py-[2px] px-4 rounded-md hover:bg-secondary"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
