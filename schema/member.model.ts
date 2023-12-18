import mongoose, { Schema, Document } from "mongoose";
import {
  member_status_enums,
  member_type_enums,
  ordinary_enums,
} from "../lib/config";

interface Member extends Document {
  mb_nick: string;
  mb_phone: string;
  mb_password: string;
  mb_type: string;
  mb_status: string;
  mb_full_name?: string;
  mb_address?: string;
  mb_description?: string;
  mb_image?: string;
  mb_point: number;
  mb_top: string;
  mb_views: number;
  mb_likes: number;
  mb_follow_cnt: number;
  mb_subscriber_cnt: number;
}

const memberSchema: Schema<Member> = new mongoose.Schema(
  {
    mb_nick: {
      type: String,
      required: true,
      index: { unique: true, sparse: true },
    },
    mb_phone: {
      type: String,
      required: true,
    },
    mb_password: {
      type: String,
      required: true,
      select: false,
    },
    mb_type: {
      type: String,
      required: true,
      default: "USER",
      enum: {
        values: member_type_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    mb_status: {
      type: String,
      required: true,
      default: "ACTIVE",
      enum: {
        values: member_status_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    mb_full_name: {
      type: String,
      required: false,
    },
    mb_address: {
      type: String,
      required: false,
    },
    mb_description: {
      type: String,
      required: false,
    },
    mb_image: {
      type: String,
      required: false,
    },
    mb_point: {
      type: Number,
      required: false,
      default: 0,
    },
    mb_top: {
      type: String,
      required: false,
      default: "N",
      enum: {
        values: ordinary_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    mb_views: {
      type: Number,
      required: false,
      default: 0,
    },
    mb_likes: {
      type: Number,
      required: false,
      default: 0,
    },
    mb_follow_cnt: {
      type: Number,
      required: false,
      default: 0,
    },
    mb_subscriber_cnt: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Member>("Member", memberSchema);
