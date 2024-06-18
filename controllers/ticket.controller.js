import userModel from "../models/user.model.js";

//add items to ticket
const addToTicket = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let ticketData = await userData.ticketData;
    if (!ticketData[req.body.itemId]) {
      ticketData[req.body.itemId] = 1;
    } else {
      ticketData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { ticketData });
    res.json({ success: true, message: "Added To ticket." });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error adding to ticket. Please try again later.",
    });
  }
};

//remove items from ticket
const removeFromTicket = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let ticketData = await userData.ticketData;
    if (ticketData[req.body.itemId] > 0) {
      ticketData[req.body.itemId] -= 1;
    } else {
      return res.json({ success: false, message: "Ticket empty." });
    }

    await userModel.findByIdAndUpdate(req.body.userId, { ticketData });
    res.json({ success: true});
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error removing from ticket. Please try again later.",
    });
  }
};

//fetchticketData
const getTicketData = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let ticketData = await userData.ticketData;
    res.json({ success: true, ticketData });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error retreiving ticket. Please try again later.",
    });
  }
};
export { addToTicket, removeFromTicket, getTicketData };
