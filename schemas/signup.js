const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.virtual('userId').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJson', {
  virtual: true,
});

module.exports = mongoose.model('signup', UserSchema);
