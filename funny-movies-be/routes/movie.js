const express = require('express');
const Movie = require('../models/movieModel');
const User = require('../models/userModel');
const auth = require('../middleware/auth');

const router = express.Router();

const LIMIT_PAGE_SIZE = 3;

router.get('/', async (req, res) => {
    const { page } = req.query;
    try {
        let pageSize = LIMIT_PAGE_SIZE;

        let currentPage = 1;
        if (page) {
            currentPage = +page;
        }

        const skip = (page - 1) * pageSize;

        const Query = Movie.find().populate({ path: 'sharedBy', select: 'email' });
        if (skip) Query.skip(skip);
        Query.limit(pageSize).sort({ createdAt: -1 });
        const [movies, total] = await Promise.all([Query, Movie.countDocuments()]);
        return res
            .status(200)
            .json({
                data: movies,
                paging: {
                    total,
                    page: currentPage,
                    limit: pageSize
                }
            });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post('/', auth, async (req, res) => {
    const { title, url, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Please input title' });
    }
    if (!url) {
        return res.status(400).json({ message: 'Please input url' });
    }
    const sharedBy = req.userId;
    const newMovie = new Movie({ title, sharedBy, url, description });
    try {
        await newMovie.save();
        return res.status(201).json(newMovie);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/:id/like', auth, async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const [user, movie] = await Promise.all([User.findById(userId), Movie.findById(id)]);
        if (!movie) return res.status(404).json({ message: 'No movie with that id' });

        if (!user.likedMovies.includes(id)) {
            movie.likes++;
            user.likedMovies.push(id);
        }

        if (user.dislikedMovies.includes(id)) {
            movie.dislikes--;
            user.dislikedMovies = user.dislikedMovies.filter((movieId) => movieId != id);
        }

        await Promise.all([movie.save(), user.save()]);
        return res.json({ message: "true" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/:id/unlike', auth, async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const [user, movie] = await Promise.all([User.findById(userId), Movie.findById(id)]);
        if (!movie) return res.status(404).json({ message: 'No movie with that id' });

        if (user.likedMovies.includes(id)) {
            movie.likes -= 1;
            user.likedMovies = user.likedMovies.filter((movieId) => movieId != id);
            await Promise.all([movie.save(), user.save()]);
        }
        return res.json({ message: "true" });
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/:id/dislike', auth, async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const [user, movie] = await Promise.all([User.findById(userId), Movie.findById(id)]);
        if (!movie) return res.status(404).json({ message: 'No movie with that id' });

        if (!user.dislikedMovies.includes(id)) {
            movie.dislikes++;
            user.dislikedMovies.push(id);
        }

        if (user.likedMovies.includes(id)) {
            movie.likes--;
            user.likedMovies = user.likedMovies.filter((movieId) => movieId != id);
        }

        await Promise.all([movie.save(), user.save()]);
        return res.json({ message: "true" });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/:id/undislike', auth, async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const [user, movie] = await Promise.all([User.findById(userId), Movie.findById(id)]);
        if (!movie) return res.status(404).json({ message: 'No movie with that id' });

        if (user.dislikedMovies.includes(id)) {
            movie.dislikes -= 1;
            user.dislikedMovies = user.dislikedMovies.filter((movieId) => movieId != id);
            await Promise.all([movie.save(), user.save()]);
        }

        return res.json({ message: "true" });
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
