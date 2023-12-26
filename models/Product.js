const assert = require("assert");
const ProductModel = require("../schema/product.model");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const Definer = require("../lib/mistake");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }

  async addNewProductData(data, member) {
    try {
      data.seller_mb_id = shapeIntoMongooseObjectId(member._id);

      const new_product = new this.productModel(data);
      console.log("new", new_product);
      const result = await new_product.save();

      assert.ok(result, Definer.product_err1);
      console.log("res", result);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async updateChosenProductData(param_id, updated_data, auth_id) {
    try {
      const id = shapeIntoMongooseObjectId(param_id),
        mb_id = shapeIntoMongooseObjectId(auth_id);

      console.log(updated_data);
      const result = await this.productModel
        .findOneAndUpdate({ _id: id, seller_mb_id: mb_id }, updated_data, {
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

  async getMySellerProductsData(member) {
    try {
      member._id = shapeIntoMongooseObjectId(member?._id);
      const result = await this.productModel.find({
        seller_mb_id: member._id,
      });
      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
