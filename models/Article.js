const assert = require("assert");
const {
  shapeIntoMongooseObjectId,
  lookup_auth_member_liked,
} = require("../lib/config");
const articleModel = require("../schema/article.model");
const Definer = require("../lib/mistake");

class Article {
  constructor() {}

  async createArticleData(member, data) {
    try {
      data.mb_id = shapeIntoMongooseObjectId(member._id);

      const new_article = await this.saveArticleData(data);
      return new_article;
    } catch (err) {
      throw err;
    }
  }

  async saveArticleData(data) {
    try {
      const article = new articleModel(data);

      return await article.save();
    } catch (mongo_err) {
      console.log(mongo_err);
      throw new Error(Definer.mongo_validation_err1);
    }
  }

  async getAllArticlesData() {
    try {
      const result = await articleModel
        .aggregate([
          {
            $sort: { createdAt: -1 },
          },
          {
            $lookup: {
              from: "members",
              localField: "mb_id",
              foreignField: "_id",
              as: "member_data",
            },
          },
          { $unwind: "$member_data" },
        ])
        .exec();
      assert(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
  async updateArticleByAdminData(update_data) {
    try {
      const id = shapeIntoMongooseObjectId(update_data?.id);
      console.log("update", update_data);
      const result = await articleModel
        .findByIdAndUpdate({ _id: id }, update_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getMemberArticlesData(member, mb_id, query) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
      mb_id = shapeIntoMongooseObjectId(mb_id);
      const page = query.page ? Number(query.page) : 1;
      const limit = query.limit ? Number(query.limit) : 5;

      const result = await this.boArticleModel
        .aggregate([
          { $match: { mb_id: mb_id, art_status: "active" } },
          {
            $sort: { createdAt: -1 },
          },
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $lookup: {
              from: "members",
              localField: "mb_id",
              foreignField: "_id",
              as: "member_data",
            },
          },
          { $unwind: "$member_data" },
          lookup_auth_member_liked(auth_mb_id),
        ])
        .exec();

      assert.ok(result, Definer.article_err2);

      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = Article;
