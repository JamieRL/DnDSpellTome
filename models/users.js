const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const favouriteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique:true
  }
}, {
  timestamps: true
})

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
    lowercase: true,
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
  console.log('password entered', password);
  console.log('password stored', this.password);
  return bcrypt.compareSync(password, this.password);
};

var Users = mongoose.model('User', userSchema);

module.exports = Users
