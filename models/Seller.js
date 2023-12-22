const assert = require("assert");
const memberModel = require("../schema/member.model");
const {
  shapeIntoMongooseObjectId,
  //   lookup_auth_member_liked,
} = require("../lib/config");

class Seller {
  constructor() {}
  async getAllSellersData() {
    try {
      const result = await memberModel
        .find({
          mb_type: "SELLER",
        })
        .exec();
      //   assert(result, Definer.general_err1);

      return result;
    } catch (err) {
      throw err;
    }
  }
  async updateSellerByAdminData(update_data) {
    try {
      const id = shapeIntoMongooseObjectId(update_data?.id);
      const result = await memberModel
        .findByIdAndUpdate({ _id: id }, update_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();

      //   assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = Seller;
