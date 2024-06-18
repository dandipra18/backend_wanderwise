import express from 'express';
import CommentModel from '../models/comment.model.js';
import { addComment, getCommentsByArticleId, getAllComments, deleteComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/', addComment);
router.get('/:id', getCommentsByArticleId);
router.get('/', getAllComments);
router.delete('/:id', deleteComment);

router.delete('/article/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params;
    await CommentModel.deleteMany({ articleId });
    res.json({ success: true, message: "Comments deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to delete comments" });
  }
});

export default router;
