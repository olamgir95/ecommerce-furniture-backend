const mongoose = require("mongoose");
const { product_status_enums } = require("../lib/config");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    seller_mb_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: false,
    },

    event_location: {
      type: String,
      required: true,
    },
    event_title: { type: String, required: true },
    event_description: {
      type: String,
      required: true,
    },
    event_status: {
      type: String,
      required: true,
      default: "PROCESS",
      enum: {
        values: product_status_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    seller_mb_nick: {
      type: String,
      required: true,
    },

    event_image: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true } }
);

module.exports = mongoose.model("Event", eventSchema);
