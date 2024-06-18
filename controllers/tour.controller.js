import tourModel from "../models/tour.model.js";
import fs from "fs";


const addDestination = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const tour = new tourModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    image: image_filename,
  });

  try {
    await tour.save();
    res.json({ success: true, message: "tours added." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error adding tour." });
  }
};


const getTours = async (req, res) => {
  try {
    const tours = await tourModel.find({});
    res.json({ success: true, data: tours });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error loading tour datas." });
  }
};
const getTourById = async (req, res) =>{
  try{
    const tour = await tourModel.findById(req.params.id)
    if(tour){
      res.json({ success: true, data: tour });
    }else{
      res.json({ success: false, message: "No tour details found." });
    }
  }catch(error){
    console.log(error)
    res.json({ success: false, message: "Error loading tour data." });
  }
}


const updateTourStatus = async (req, res) => {
  const tourId = req.params.id;

  try {
    const tour = await tourModel.findById(tourId);

    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found." });
    }

    tour.price = req.body.price;
    tour.available = req.body.available;

    await tour.save();

    res.json({ success: true, message: "tour status updated." });
  } catch (error) {
    console.error("Error updating tour status:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating tour price." });
  }
};


const removeTour = async (req, res) => {
  try {
    const tour = await tourModel.findById(req.body.id);
    fs.unlink(`uploads/${tour.image}`, () => {});

    await tourModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Tour removed." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error deleting Tour." });
  }
};
export { addDestination,getTourById, getTours, removeTour, updateTourStatus };
