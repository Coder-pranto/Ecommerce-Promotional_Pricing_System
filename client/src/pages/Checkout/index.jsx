import { useContext, useState } from "react";
import ContactForm from "../../components/customers/Checkout/ContactForm";
import Orders from "../../components/customers/Checkout/Orders";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FaArrowLeft } from "react-icons/fa";
import { OrderContext } from "../../context/OrderContext";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AppDownload from "../../components/customers/AppDownload";



export default function Checkout() {
  const { orderItems, getOrderSubTotal, clearOrder } = useContext(OrderContext);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  // console.log(orderItems);
  const navigate = useNavigate();
  const userId = Cookies.get("userId");

  const schema = yup.object().shape({
    checkForAnotherPerson: yup.bool(),
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("email is required"),
    phoneNumber: yup
      .string()
      .matches(/^(\+?88)?01[3-9](\d){8}$/, "Invalid Phone Number")
      .required("Phone number is requried"),
    address: yup.string().required("Address is required"),
    district: yup.string().required("District is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // post order
  const handleOrderSubmit = async (data) => {
    // console.log(data);
    const userBuyer = {
      userId: userId,
      address: data.address,
      district: data.district,
    };
    const guestBuyer = {
      userId: userId,
      guest: data.checkForAnotherPerson,
      guestName: data.name,
      guestEmail: data.email,
      guestPhone: data.phoneNumber,
      address: data.address,
      district: data.district,
    };

    const order = {
      products: orderItems.map((orderItem) => ({
        product: orderItem._id,
        seller: orderItem.seller_id,
        quantity: orderItem.quantity,
      })),
      buyer: (() => {
        if (checked) return guestBuyer;
        else return userBuyer;
      })(),
    };
    // console.log(order);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/order",
        // "http://localhost:5000/api/v1/order",
        order,
        {
          headers: {
            Authorization: `${Cookies.get("token")}`,
          },
        }
      );

      // console.log(response);
      if (response.status === 201) {
        setLoading(false);
        toast.success("Order Completed Successfully");
        reset();
        clearOrder();

        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(`${error.message}`);
    }
  };

  return (
    <section>
      <div className="mb-20">
        {/* Header */}
        <div className="w-full flex items-center mx-auto my-5 p-0">
          <button type="button">
            <FaArrowLeft onClick={() => navigate(-1)} />
          </button>
          <div className="ml-14">
            <h2 className="text-xxl mb-2">Checkout</h2>
            <div>
              <span className="font-semibold text-slate-400">Home &gt;</span>
              <span className="font-semibold text-slate-400">
                Clothing Category &gt;
              </span>
              <span className="font-semibold text-primary"> Product</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="w-full h-[600px]">
            <div className="text-xl">Checkout Information</div>
            <div className="border border-slate-300 my-4" />
            <ContactForm
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              handleOrderSubmit={handleOrderSubmit}
              loading={loading}
              checked={checked}
              setChecked={setChecked}
              userId={userId}
              reset={reset}
            />
          </div>

          <div className="relative w-full h-[570px]">
            <h3 className="text-xl">Your Order</h3>
            <div className="border border-slate-300 my-4" />
            <div className="w-full h-[300px] overflow-y-auto scroll-smooth absolute top-16 left-0 pr-3">
              {[...orderItems]?.reverse().map((order) => (
                <Orders key={order?._id} order={order} />
              ))}
            </div>
            <div className="absolute bottom-0 py-5 border-t-2 border-gray-300 bg-white w-full ">
              <ul className="flex justify-between items-center mx-3">
                <div className="flex flex-col gap-3">
                  <li>SubTotal</li>
                  <li>Shipping</li>
                  <li>Vat, Tax</li>
                </div>
                <div className="flex flex-col gap-3 text-right">
                  <li>{getOrderSubTotal()} BDT</li>
                  <li>0 BDT</li>
                  <li>0 BDT</li>
                </div>
              </ul>
              <div className="border border-gray-300 my-4" />
              <div className="flex justify-between items-center mx-3">
                <h4 className="text-xl font-semibold">Total</h4>
                <h4 className="text-xl font-semibold">
                  {getOrderSubTotal()} BDT
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppDownload />
    </section>
  );
}
