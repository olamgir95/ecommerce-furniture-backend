const Article = require("../models/Article");

const communityController = {
  imageInsertion: async (req, res) => {
    try {
      console.log(`POST: cont/imageInsertion`);
      console.log(req.file);
      assert.ok(req.file, Definer.general_err3);
      const image_url = req.file.path.replace(/\\/g, "/");

      res.json({ state: "success", data: image_url });
    } catch (err) {
      console.log(`ERROR, cont/imageInsertion, ${err.message}`);
      res.json({ state: "fail", message: err.message });
    }
  },

  //BSSR//
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
