import articleModel from "../models/article.model.js";
import commentModel from "../models/comment.model.js";
import fs from "fs";
import path from "path";

// Add a new article
const addArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file.filename;
    const newArticle = new articleModel({ title, content, image });
    await newArticle.save();
    res.json({ success: true, message: "Artikel berhasil ditambahkan." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Gagal menambahkan artikel." });
  }
};

// Get all articles
const getArticles = async (req, res) => {
  try {
    const articles = await articleModel.find({});
    res.json({ success: true, articles });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Gagal mengambil artikel." });
  }
};

// Get an article by ID
const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articleModel.findById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Artikel tidak ditemukan" });
    }
    res.json({ success: true, article });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Gagal mengambil artikel." });
  }
};

// Delete an article by ID
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articleModel.findById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Artikel tidak ditemukan" });
    }
    if (article.image) {
      const imagePath = path.join('uploads', article.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.warn(`File tidak ditemukan: ${imagePath}`);
      }
    }
    await articleModel.findByIdAndDelete(id);
    await commentModel.deleteMany({ articleId: id });
    res.json({ success: true, message: "Artikel dan komentar terkait berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Gagal menghapus artikel." });
  }
};


export { addArticle, getArticles, getArticleById, deleteArticle };
