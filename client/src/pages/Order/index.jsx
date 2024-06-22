import toast from "react-hot-toast";
import Header from "../../components/Header";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import DynamicModal from "../../components/Modal";
import Cookies from "js-cookie";
import { OrderContext } from "../../context/OrderContext";
import socketIOClient from "socket.io-client";

const Order = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [showPending, setShowPending] = useState(true);
  const [orders, setOrders] = useState([]);
  const [actualOrder, setActualOrder] = useState([]);
  const [selectedBuyerInfo, setSelectedBuyerInfo] = useState(null);
  const sellerId = Cookies.get("sellerID");

  const { discountedPrice } = useContext(OrderContext);
  // console.log(orders);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/order/all"
      );
      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const socket = socketIOClient(
      "https://api.discounthutdeshit.tailormaster.xyz/"
    );

    socket.on("newOrder", () => {
      fetchData();
    });

    fetchData();

    return () => {
      socket.disconnect();
    };
  }, [fetchData]); // Fetch data on initial component mount

  useEffect(() => {
    if (orders?.length > 0) {
      orderData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  const orderData = () => {
    let groupedData = [];

    orders?.forEach((order) => {
      const { buyer, products, _id: buyer_id, status } = order;

      let orderedItems = [];

      products?.forEach((x) => {
        if (x?.seller?._id === sellerId) {
          //   console.log("done", x);
          orderedItems.push(x);
        }
      });

      // Check if any items were ordered from the seller
      if (orderedItems.length > 0) {
        groupedData.push({
          buyerId: buyer_id,
          buyerInfo: buyer,
          orderedItems: orderedItems,
          status: status,
        });
      }
    });

    setActualOrder(groupedData);

    // console.log("this is main data", groupedData);
  };

  const getTotalOrderedItemsQuantity = (products) => {
    let totalQuantity = 0;

    products.forEach((product) => {
      totalQuantity += product.quantity;
    });

    return totalQuantity;
  };

  const getImageUrlOfFirstOrderItem = (products) => {
    if (products?.length > 0) {
      return products[0]?.product?.image;
    } else {
      return "./../../../public/order.png";
    }
  };

  const handleStatusChange = async (orderId, currStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/order/${orderId}`,
        {
          status: currStatus === "pending" ? "accepted" : "pending", // Toggle between pending and accepted
        }
      );

      if (response.status === 200) {
        // console.log('Order status updated successfully');
        fetchData();
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      // console.error('Failed to update order status:', error.message);
      toast.error("Failed to update order status:", error.message);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/order/${orderId}`
      );

      if (response.status === 200) {
        console.log("Order deleted successfully");
        fetchData();
        toast.success("Order deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete order:", error.message);
      toast.error("Failed to delete order:", error.message);
    }
  };

  const windowWidth = window.innerWidth;
  const modalCustomStyles = {
    content: {
      width:
        windowWidth <= 500
          ? "90%"
          : windowWidth > 500 && windowWidth <= 1000
            ? "60%"
            : windowWidth > 1000 && windowWidth <= 1300
              ? "50%"
              : "35%",
      height:
        windowWidth > 1300
          ? "550px" // Set a fixed height for windowWidth > 1300
          : "50%", // Default height for other windowWidth
      margin: "auto",
      border: "1px solid #0E8AA5",
      borderRadius: "4px",
      padding: "0px",
    },
  };

  // Function to open the modal and set selected buyer info
  const openModal = (buyerId) => {
    const buyerInfo = actualOrder?.find((order) => order?.buyerId === buyerId);
    setSelectedBuyerInfo(buyerInfo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <Header headerTitle="Manage your orders" />

      <div className="w-[90%] mx-auto mt-24 border-2 border-secondary rounded-3xl ">
        <div className="text-left">
          <h2 className="text-2xl p-4">Active Orders</h2>
        </div>
        <div className="w-[40%] mx-4 p-4 flex flex-start gap-4">
          <h3
            className={`text-xl cursor-pointer ${showPending
                ? "text-primary underline underline-offset-8 decoration-[3px]"
                : ""
              }`}
            onClick={() => setShowPending(true)}
          >
            Pending
          </h3>
          <h3
            className={`text-xl cursor-pointer ${!showPending
                ? "text-primary underline underline-offset-8 decoration-[3px]"
                : ""
              }`}
            onClick={() => setShowPending(false)}
          >
            Completed
          </h3>
        </div>

        <table className="justify-center w-full table-auto rounded-xl mb-7 p-2">
          <tbody>
            {actualOrder?.map(
              (item, index) =>
                ((showPending && item.status === "pending") ||
                  (!showPending && item.status !== "pending")) && (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200`}
                    style={{ height: "50px" }}
                  >
                    <td className="px-4 py-2 w-1/4">
                      <span className="text-slate-400 pb-4">
                        ID {item?.buyerId}
                      </span>
                      <img
                        src={`${getImageUrlOfFirstOrderItem(
                          item?.orderedItems
                        )}`}
                        className="w-[30%] h-[10%]"
                      />
                    </td>
                    <td className="px-4 py-2 w-1/4">
                      Quantity -{" "}
                      {getTotalOrderedItemsQuantity(item?.orderedItems)}
                    </td>
                    <td className="px-4 py-2 w-1/4">
                      <button
                        onClick={() =>
                          handleStatusChange(item?.buyerId, item?.status)
                        }
                        className={`${index % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                          } bg-slate-300 hover:bg-slate-400 ${item.status === "pending"
                            ? "text-orange-600"
                            : "text-green-600"
                          } text-green-600 font-normal py-2 px-4 rounded`}
                        disabled={item.status === "accepted"}
                      >
                        {item?.status}
                      </button>
                    </td>
                    <td className="px-4 py-2 w-1/4">
                      <button
                        onClick={() => openModal(item?.buyerId)}
                        className="text-primary"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(item?.buyerId)}
                        className="text-red-700 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>

        <DynamicModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          customStyle={modalCustomStyles}
          content={
            selectedBuyerInfo && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-primary  mb-2 p-2">
                    Buyer Information
                  </h2>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <p className="text-gray-800">
                      <strong>Buyer ID:</strong> {selectedBuyerInfo.buyerId}
                    </p>
                    <p className="text-gray-800">
                      <strong>Buyer Name:</strong>{" "}
                      {selectedBuyerInfo.buyerInfo.guest
                        ? selectedBuyerInfo.buyerInfo.guestName
                        : selectedBuyerInfo.buyerInfo.userId.name}
                    </p>
                    <p className="text-gray-800">
                      <strong>Email:</strong>{" "}
                      {selectedBuyerInfo.buyerInfo.guest
                        ? selectedBuyerInfo.buyerInfo.guestEmail
                        : selectedBuyerInfo.buyerInfo.userId.email}
                    </p>
                    <p className="text-gray-800">
                      <strong>Phone:</strong>{" "}
                      {selectedBuyerInfo.buyerInfo.guest
                        ? selectedBuyerInfo.buyerInfo.guestPhone
                        : selectedBuyerInfo.buyerInfo.userId.phone}
                    </p>
                    <p className="text-gray-800">
                      <strong>Address:</strong>{" "}
                      {selectedBuyerInfo.buyerInfo.address}
                    </p>
                    <p className="text-gray-800">
                      <strong>District:</strong>{" "}
                      {selectedBuyerInfo.buyerInfo.district}
                    </p>
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-200" />
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-2 p-2">
                    Ordered Items
                  </h2>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="px-6 py-3 text-center">Product Name</th>
                        <th className="px-6 py-3 text-center">Price</th>
                        <th className="px-6 py-3 text-center">Quantity</th>
                        <th className="px-6 py-3 text-center">Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBuyerInfo?.orderedItems?.map((item, index) => {
                        console.log(item);
                        return (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                            }
                          >
                            <td className="px-6 py-4 text-gray-800 text-center">
                              {item?.product?.product_name}
                            </td>
                            <td className="px-6 py-4 text-gray-800 text-center">
                              {discountedPrice(
                                item?.product?.price,
                                item?.product?.discount,
                                item?.product?.discount_type?.name
                              )}{" "}
                              Tk
                            </td>
                            <td className="px-12 py-4 text-gray-800 text-center">
                              {item?.quantity}
                            </td>
                            <td className="px-12 py-4 text-gray-800 text-center">
                              {item?.quantity *
                                discountedPrice(
                                  item?.product?.price,
                                  item?.product?.discount,
                                  item?.product?.discount_type?.name
                                )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="text-center mt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary m-4"
                  >
                    Close
                  </button>
                </div>
              </>
            )
          }
        />
      </div>
    </div>
  );
};

export default Order;
