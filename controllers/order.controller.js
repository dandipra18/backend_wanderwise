import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import { emitOrderStatusUpdate } from "../server.js";


const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { ticketData: {} });

    return res.json({
      success: true,
      
      orderId: newOrder._id
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error placing order. Please try again later.",
    });
  }
};

const userOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Order Fetching failed." });
  }
};


const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Order Fetching failed." });
  }
};


const updateStatus = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    emitOrderStatusUpdate(req.body.orderId, req.body.status); 
    res.json({ success: true, message: "Order status updated." });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to update order. Try again later.",
    });
  }
};


const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await orderModel.findById(orderId);
    
    if (!order) {
      return res.json({ success: false, message: "Ticket not found." });
    }
    
    if (order.status === "Sudah Bayar") {
      return res.json({ success: false, message: "Cannot cancel a paid order." });
    }

    await orderModel.findByIdAndDelete(orderId);
    emitOrderStatusUpdate(orderId, "Cancelled"); 
    res.json({ success: true, message: "Ticket cancelled successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error cancelling order. Please try again later." });
  }
};

export { placeOrder,  userOrder, listOrders, updateStatus, cancelOrder };

