import { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState(
    localStorage.getItem("orderItems")
      ? JSON.parse(localStorage.getItem("orderItems"))
      : []
  );

  // filtering order that order exists on orderItems or not
  const filteredOrder = (order) =>
    orderItems.find((item) => item._id === order?._id);

  // calculating discounted price
  const discountTypes = ["20%", "30%", "40%", "50%", "60%", "70%", "80%"];
  // const discountedPrice = (price, discount, discountType) =>
  //   discountType === "percenatge" || discountTypes.includes(discountType)
  //     ? Math.round(price - (price * discount) / 100)
  //     : Math.round(price - discount);

  const discountedPrice = (price, discount, discountType) =>
    discountType === "fixed"
      ? Math.round(price - discount)
      : discountType === "percenatge" || discountTypes.includes(discountType)
      ? Math.round(price - (price * discount) / 100)
      : price;

  // function for add to order
  const addToOrder = (item) => {
    const isItemInOrder = filteredOrder(item);

    if (isItemInOrder) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem._id === item._id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setOrderItems([
        ...orderItems,
        {
          ...item,
          discountedPrice: discountedPrice(
            item.price,
            item.discount,
            item.discount_type.name
          ),
          quantity: 1,
        },
      ]);
    }
  };

  // function to remove order
  const removeFromOrder = (item) => {
    const isItemInOrder = filteredOrder(item);

    if (isItemInOrder.quantity === 1) {
      setOrderItems(
        orderItems.filter((orderItem) => orderItem._id !== item._id)
      );
    } else {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem._id === item._id
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        )
      );
    }
  };

  // function to remove single order
  const removeSingleOrder = (id) =>
    setOrderItems(orderItems.filter((orderItem) => orderItem._id !== id));

  // function to remove multiple order
  const removeMultipleFromOrder = (ids) =>
    setOrderItems(
      orderItems.filter((orderItem) => !ids.includes(orderItem._id))
    );

  // function to clear order
  const clearOrder = () => setOrderItems([]);

  // function to get subTotal order
  const getOrderSubTotal = () =>
    orderItems.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );

  useEffect(() => {
    localStorage.setItem("orderItems", JSON.stringify(orderItems));
  }, [orderItems]);

  useEffect(() => {
    const orderItems = localStorage.getItem("orderItems");
    if (orderItems) {
      setOrderItems(JSON.parse(orderItems));
    }
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orderItems,
        addToOrder,
        removeFromOrder,
        removeMultipleFromOrder,
        clearOrder,
        discountedPrice,
        getOrderSubTotal,
        removeSingleOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
