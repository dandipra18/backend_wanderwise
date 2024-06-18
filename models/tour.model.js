import mongoose from "mongoose";

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    }
    
  },
  { timestamps: true }
);


const toursModel = mongoose.model.tours || mongoose.model("tours", toursSchema)

export default toursModel;