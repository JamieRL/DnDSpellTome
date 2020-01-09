const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const favouriteSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  favourites: [favouriteSchema]
},{
  timestamps: true
});

// hash the password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var Users = mongoose.model('User', userSchema);

module.exports = Users
