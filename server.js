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
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import { Server } from "socket.io";
import http from "http";

dotenv.config();
// app config
const app = express();

//middleware
app.use(express.json());
app.use(cors());
connectDb();

// Konfigurasi AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Konfigurasi multer untuk menggunakan S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
});

// API endpoint untuk upload file
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

//api endpoints

//tours api
app.use("/api/tours", tourRouter);

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
