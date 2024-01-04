const Article = require("../models/Article");

const communityController = {
  getAllArticles: async (req, res) => {
    try {
      console.log("GET cont/getAllarticles");

      const article = new Article();
      const article_data = await article.getAllArticlesData();
      res.render("all-articles", { article_data: article_data });
    } catch (err) {
      console.log(`ERROR, cont/getAllarticles, ${err.message}`);
      res.json({ state: "fail", message: err.message });
    }
  },

  updateArticleStatusByAdmin: async (req, res) => {
    try {
      console.log("GET cont/updateArticlesStatus");
      const article = new Article();
      const result = await article.updateArticleByAdminData(req.body);
      await res.json({ state: "success", data: result });
    } catch (err) {
      console.log(`ERROR, cont/updateArticlesStatus, ${err.message}`);
      res.json({ state: "fail", message: err.message });
    }
  },
};

module.exports = communityController;
