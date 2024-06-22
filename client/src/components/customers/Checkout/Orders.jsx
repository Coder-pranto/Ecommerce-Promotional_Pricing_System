import { GoTrash } from "react-icons/go";
import SelectOption from "../../Forms/SelectOptions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";
import toast from "react-hot-toast";

export default function Orders({ order }) {
  const { addToOrder, removeFromOrder, removeSingleOrder, discountedPrice } =
    useContext(OrderContext);

  // console.log(order);

  // use this for adding size and color

  // const schema = yup.object().shape({
  //   size: yup.string().required("Address is required"),
  //   colour: yup.string().required("District is required"),
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  const handleDeleteOrder = (id) => {
    alert(`Are you want to delete this order`);
    toast.success("Deleted successfully");
    removeSingleOrder(id);
  };

  // const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between">
          <h4>{order?.product_name}</h4>
          <button type="button" onClick={() => handleDeleteOrder(order?._id)}>
            <GoTrash className="text-primary" />
          </button>
        </div>
        {/* Details */}
        <div className="flex justify-between items-center gap-3">
          <img
            src={order?.image}
            alt={order?.product_name}
            className="h-[80px] w-[80px] object-cover"
          />
          {/* <ul>
            <li>- Vintage HighSchool Jack Bully</li>
            <li>- 1960 Classic Edition</li>
          </ul> */}
          <div className="flex flex-col items-center gap-2">
            <span>Quantity</span>
            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={() => removeFromOrder(order)}
                className={`border border-primary px-2 text-primary text-center rounded-sm ${
                  order?.quantity === 1 && "cursor-not-allowed opacity-40"
                }`}
                disabled={order?.quantity === 1}
              >
                -
              </button>
              <span className="w-5 text-center">{order?.quantity}</span>
              <button
                type="button"
                onClick={() => addToOrder(order)}
                className="border border-primary px-2 text-primary text-center rounded-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>
        {/* Size,Colour and Price */}
        {/* <div className="flex justify-between items-center">  { after adding size and colour remove the below div and use this one} */}
        <div>
          {/* <form
            className="flex items-center gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SelectOption
              label="Size"
              name="size"
              register={register}
              error={errors?.size}
              className="rounded-md outline-1 outline-primary"
            />
            <SelectOption
              label="Colour"
              name="colour"
              register={register}
              error={errors?.colour}
              className="rounded-md outline-1 outline-primary"
            />
          </form> */}
          <div className="flex items-center justify-end gap-3">
            <span className="text-gray-400 italic text-md line-through">
              {order?.price * order?.quantity} BDT
            </span>
            <span>{order?.discountedPrice * order?.quantity} BDT</span>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 my-4" />
    </>
  );
}
