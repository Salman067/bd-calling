import { model, Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trainId: {
      type: Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    fromStation: {
      type: String,
      required: true,
    },
    toStation: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    ticketNumber: {
      type: String,
    },
    seatNumber: {
      type: [String], 
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Ticket = model("Ticket", ticketSchema);
