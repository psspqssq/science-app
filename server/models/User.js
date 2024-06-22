const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    dob: {
      type: Date
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    permissions: {
      type: [String]
    }
  },
  {
    collection: "users"
  }
);

module.exports = mongoose.model("User", userSchema);
