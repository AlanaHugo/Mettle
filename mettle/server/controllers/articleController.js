import Article from "../models/Article.js";

export const getMyArticles = async (req, res) => {
  console.log("Backend: getMyArticles called");
  console.log("Backend: req.user =", req.user);

  try {
    const userId = req.user.id.toString();
    const myArticles = await Article.find({ authorId: userId });
    console.log(
      `Backend: Found ${myArticles.length} articles for user ${userId}`
    );
    res.status(200).json(myArticles);
  } catch (err) {
    console.error("Backend error in getMyArticles:", err);
    res.status(500).json({ error: "Failed to fetch your articles" });
  }
};

export const updateArticle = async (req, res) => {
  const userId = req.user.id.toString();
  const { id } = req.params;
  const { body } = req.body;

  try {
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    if (article.authorId.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    article.body = body;
    await article.save();
    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update article" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    console.log("deleteArticle called");
    console.log("req.user:", req.user);
    console.log("req.params.id:", req.params.id);

    const userId = req.user?.id;
    if (!userId) {
      console.error("No userId found in req.user");
      return res.status(401).json({ message: "Unauthorized: no user ID" });
    }

    const { id } = req.params;
    if (!id) {
      console.error("No article id provided in params");
      return res.status(400).json({ message: "Article ID required" });
    }

    const article = await Article.findById(id);
    console.log("Found article:", article);

    if (!article) {
      console.error("Article not found");
      return res.status(404).json({ message: "Article not found" });
    }

    if (!article.authorId) {
      console.error("Article authorId is missing");
      return res.status(500).json({ message: "Article authorId is missing" });
    }

    if (article.authorId.toString() !== userId) {
      console.error("User not authorized to delete this article");
      return res.status(403).json({ message: "Unauthorized" });
    }

    await article.deleteOne();
    console.log("Article deleted successfully");
    return res.json({ message: "Article deleted" });

  } catch (err) {
    console.error("Error in deleteArticle:", err);
    return res.status(500).json({ message: "Failed to delete article" });
  }
};
