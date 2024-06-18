import CommentModel from "../models/comment.model.js";

// Tambahkan komentar
const addComment = async (req, res) => {
  try {
    const { articleId, name, comment } = req.body;
    const newComment = new CommentModel({ articleId, name, comment });
    await newComment.save();
    res.json({ success: true, comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal menambahkan komentar" });
  }
};

// Dapatkan komentar berdasarkan ID artikel
const getCommentsByArticleId = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await CommentModel.find({ articleId: id }).populate('articleId', 'title');
    res.json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal mengambil komentar" });
  }
};

// Dapatkan semua komentar
const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate('articleId', 'title');
    res.json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal mengambil komentar" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await CommentModel.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Komentar tidak ditemukan." });
    }
    res.json({ success: true, message: "Komentar berhasil dihapus." });
  } catch (error) {
    console.error("Gagal menghapus komentar:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan saat menghapus komentar." });
  }
};
export { addComment, getCommentsByArticleId, getAllComments, deleteComment};