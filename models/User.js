const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Enter a valid email",
    ],
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: true,
  versionKey: false,
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

userSchema.index({ username: 1 }, { unique: true });

const User = model("User", userSchema);
module.exports = User;
