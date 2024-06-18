import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  name: { type: String, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel;
