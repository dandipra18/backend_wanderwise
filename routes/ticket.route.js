import express from "express";
import authMidddleware from "../middleware/auth.js";
import {
  addToTicket,
  getTicketData,
  removeFromTicket,
} from "../controllers/ticket.controller.js";
const ticketRouter = express.Router();

ticketRouter.post("/add", authMidddleware, addToTicket);
ticketRouter.post("/remove",authMidddleware, removeFromTicket);
ticketRouter.post("/get",authMidddleware, getTicketData);

export default ticketRouter;
