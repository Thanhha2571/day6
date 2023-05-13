const express = require('express');
const songRouter = express.Router();
const jwt = require('jsonwebtoken');
const { songModel } = require('../models/songModel');

songRouter.get('/', async (req, res) => {
    const songs = await songModel.find({})
    res.send(songs);
})


songRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const song = await songModel.findById(id);
    res.send(song);
});

module.exports = { songRouter }