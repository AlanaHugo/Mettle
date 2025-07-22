import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  aboutAuth: { type: String, required: false },
  tags: [String],
  image: String,
  createdAt: { type: Date, default: Date.now },
});

articleSchema.index({ title: "text", body: "text" });

export default mongoose.models.Article || mongoose.model("Article", articleSchema);
