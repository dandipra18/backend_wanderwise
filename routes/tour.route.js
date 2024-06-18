import express from "express";
import {
  addDestination,
  getTourById,
  getTours,
  removeTour,
  updateTourStatus,
} from "../controllers/tour.controller.js";
import multer from "multer";

const tourRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

tourRouter.post("/add", upload.single("image"), addDestination);
tourRouter.get('/getTourById/:id', getTourById)
tourRouter.get("/list", getTours);
tourRouter.patch("/update/available/:id", updateTourStatus);

tourRouter.post("/remove", removeTour);

export default tourRouter;
