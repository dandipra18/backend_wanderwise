import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import tourRouter from "./routes/tour.route.js";
import userRouter from "./routes/user.route.js";
import ticketRouter from "./routes/ticket.route.js";
import orderRouter from "./routes/order.route.js";
import articleRouter from "./routes/article.route.js";
import commentRouter from "./routes/comment.route.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();
// app config
const app = express();

//middleware
app.use(express.json());
app.use(cors());
connectDb();

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("tmp/uploads"));

//api endpoints

//tours api
app.use("/api/tours", tourRouter);
app.use("/images", express.static("uploads"));

//user api
app.use("/api", userRouter);

//ticket api
app.use("/api/ticket", ticketRouter);

//order api
app.use("/api/order", orderRouter);

//article api
app.use("/api/articles", articleRouter);

//comment api
app.use("/api/comments", commentRouter); 

app.get("/", (req, res) => {
  res.send("Hello");
  console.log("hello");
});

// Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export const emitOrderStatusUpdate = (orderId, status) => {
  io.emit("orderStatusUpdate", { orderId, status });
};

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running in:-> ${process.env.DOMAIN}`);
});
