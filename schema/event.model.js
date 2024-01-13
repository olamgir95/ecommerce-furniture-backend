const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    seller_mb_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: false,
    },

    location: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },

    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true } }
);

module.exports = mongoose.model("Event", eventSchema);
