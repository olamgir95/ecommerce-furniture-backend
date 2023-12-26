const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "SELLER"];
exports.member_status_enums = ["ONPAUSE", "ACTIVE", "DELETED"];
exports.product_status_enums = ["PAUSED", "PROCESS", "DELETED"];
exports.product_size_enums = ["normal", "twin", "twinXL", "full"];
exports.product_collection_enums = [
  "furniture",
  "accessories",
  "household",
  "wooden",
  "gifts",
];
exports.order_status_enums = ["PAUSED", "PROCESS", "DELETED", "FINISHED"];

exports.product_color_enums = [
  "green",
  "gray",
  "red",
  "yellow",
  "white",
  "blue",
  "black",
];
exports.ordinary_enums = ["Y", "N"];

exports.like_view_group_list = ["product", "member", "community"];
exports.board_id_enum_list = ["celebrity", "evaluation", "story"];
exports.board_article_status_enum_list = ["active", "deleted"];

/*******************************
 *    MONGODB RELATED COMMANDS *
 * *****************************/

exports.shapeIntoMongooseObjectId = (target) => {
  if (typeof target === "string") {
    return new mongoose.Types.ObjectId(target);
  } else return target;
};
