const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true,
    },

    destination: {
      type: String,
      trim: true,
      default: "",
    },

    travelDate: {
      type: String,
      default: "",
    },

    travellers: {
      type: String,
      default: "1 Adult",
      trim: true,
    },

    brief: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

ticketSchema.pre("save", function (next) {
  if (!this.ticketId) {
    this.ticketId =
      "#" + Math.floor(10000000 + Math.random() * 90000000);
  }

  next();
});

module.exports = mongoose.model("Ticket", ticketSchema);