const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    sharedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    url: String,
    description: String,
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
}, {
    timestamps: true,
    collection: 'Movie'
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;