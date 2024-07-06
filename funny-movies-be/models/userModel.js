const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type : String, unique: true, require: true },
  password: { type: String, require: true },
  likedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  dislikedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
}, {
  timestamps: true,
  collection: 'User'
});

const User = mongoose.model('User', userSchema);

module.exports = User;