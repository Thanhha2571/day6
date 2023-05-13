const express = require('express');
const adminRouter = express.Router();
const mongoose = require('mongoose');
const { userModel } = require('../models/userModel')
const { songModel } = require('../models/songModel');

// adminRouter.delete('edit_user/:id', async (req, res) => {
//     const id = req.params.id;
//     const user = await userModel.findById(id);
//     const currentUser = req.user;
//     if (currentUser.username === user.username) {
//         res.status(400).send("KO the xoa");
//         return;
//     }
//     await userModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
//     const users = await userModel.find({})
//     res.send(users);
// })

adminRouter.delete('/edit_user/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const user = await userModel.findById(id);
    await userModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    const users = await userModel.find({})
    res.send(users);
})

adminRouter.patch('/edit_user/:id', async (req, res) => {
    const id = req.params.id
    const {role} = req.body
    const user = await userModel.findById(id)
    console.log(user)
    if (user) {
        const user = await userModel.findByIdAndUpdate(id, {role}, { new: true })
        res.send(user)
    }
    else {
        res.send("User not found")
    }


})
adminRouter.post('/edit_song/add', async (req, res) => {
    const { title, artist, access } = req.body;
    let existTitle = await songModel.findOne({ title: title })
    if (existTitle) {
        res.send("Song already exists");
    }
    else {
        const song = await songModel.create({ title: title, artist: artist, access: access });
        res.send(song);
    }
})

adminRouter.delete('/edit_song/:id', async (req, res) => {
    const id = req.params.id;
    const song = await songModel.findById(id);
    await songModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
    const songs = await songModel.find({})
    res.send(songs)
})
adminRouter.patch('/edit_song/:id', async (req, res) => {
    const id = req.params.id;
    const { title, artist, access } = req.body;
    const song = await songModel.findById(id);
    song.title = title;
    song.artist = artist;
    song.access = access;
    await song.save();
    res.send(song)
})


module.exports = { adminRouter }