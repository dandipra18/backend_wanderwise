import express from "express";
import multer from "multer";
import { addArticle, getArticles, deleteArticle, getArticleById } from "../controllers/article.controller.js";

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("image"), addArticle);
router.get("/", getArticles);
router.delete("/:id", deleteArticle);
router.get("/:id", getArticleById); 

export default router;
