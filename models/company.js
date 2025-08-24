// models/Company.js
const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      default: "Other",
    },
    size: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
      default: "1-10",
    },
    foundedYear: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear(),
    },
    website: {
      type: String,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },
    location: {
      city: String,
      country: String,
    },
    employees: [
      {
        name: String,
        role: String,
        email: {
          type: String,
          lowercase: true,
          match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
