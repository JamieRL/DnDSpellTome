const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  favourites: [favouriteSchema]
},{
  timestamps: true
});

var Users = mongoose.model('User', userSchema);

module.exports = users
