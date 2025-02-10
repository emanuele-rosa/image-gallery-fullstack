const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    activeTokens: [
      {
        type: String,
      },
    ],
    loginAttempts: {
      count: { type: Number, default: 0 },
      lastAttempt: { type: Date },
    },
    accountLocked: {
      type: Boolean,
      default: false,
    },
    lockUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.incrementLoginAttempts = async function () {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return await this.updateOne({
      $set: {
        loginAttempts: { count: 1, lastAttempt: new Date() },
        lockUntil: null,
        accountLocked: false,
      },
    });
  }

  const updates = {
    $inc: { "loginAttempts.count": 1 },
    $set: { "loginAttempts.lastAttempt": new Date() },
  };

  if (this.loginAttempts.count + 1 >= 5) {
    updates.$set.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
    updates.$set.accountLocked = true;
  }

  return await this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $set: {
      loginAttempts: { count: 0 },
      lockUntil: null,
      accountLocked: false,
    },
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
