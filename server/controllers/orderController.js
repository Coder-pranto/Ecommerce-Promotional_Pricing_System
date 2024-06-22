const Order = require('../models/orderSchema');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const socketInitializer = require('../config/socketInitializer'); 
// Access the io instance
const io = socketInitializer.getIO();


// Controller to create a new order
const createOrder = async (req, res) => {
  const { products, buyer } = req.body;

  const order = new Order({ products, buyer });
  await order.save();

  const uniqueSellerIds = [...new Set(order.products.map(product => product.seller))];

  uniqueSellerIds.forEach((sellerId) => {
    io.emit('newOrder', {order,sellerId});
  });

  // io.emit('newOrder', { order });
  // console.log("order is created");
  res.status(StatusCodes.CREATED).json({ status: 'Success', data: order });
};

// Controller to get a single order by ID
const getSingleOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId).populate({
    path: 'products.product',
    populate: {
      path: 'discount_type',
      model: 'DiscountType' 
    }
  }).populate('products.seller buyer');
  
  if (!order) {
    throw new CustomError.NotFoundError('Order not found');
  }

  res.status(StatusCodes.OK).json({ status: 'Success', data: order });
};

// Controller to get all orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate({
    path: 'products.product',
    populate: {
      path: 'discount_type',
      model: 'DiscountType' 
    }
  }).populate('products.seller buyer.userId');

  res.status(StatusCodes.OK).json({ status: 'Success', data: orders });
};

// Controller to update an order by ID
const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  const updatedOrder = await Order.findByIdAndUpdate( orderId,{ status },{ new: true } );
   
  if (!updatedOrder) {
    throw new CustomError.BadRequestError('Failed to update the order');
  }
  res.status(StatusCodes.OK).json({ status: 'Updated Successfully', data: updatedOrder });
};

// Controller to delete an order by ID
const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  const deleteorder = await Order.findByIdAndDelete(orderId);

  if (!deleteorder) {
    throw new CustomError.BadRequestError('Failed to delete the order');
  }

  res.status(StatusCodes.OK).json({ message: 'Order deleted successfully' });
};

module.exports = {
  createOrder,
  getSingleOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
