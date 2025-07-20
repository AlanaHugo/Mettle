import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMyArticles, updateArticle, deleteArticle } from "../controllers/articleController.js";

const router = express.Router();

router.get("/mine", authMiddleware, getMyArticles);
router.put("/:id", authMiddleware, updateArticle);
router.delete("/:id", authMiddleware, deleteArticle);

export default router;