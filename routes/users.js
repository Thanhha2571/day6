const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/userModel');

const authorCheck = (req, res, next) => {
    const userRole = req.user.role;
    // console.log(userRole);
    if (userRole.includes('admin')) {
        next();
    }
    else {
        res.send("You are not an admin")
    }
};
userRouter.get('/', authorCheck, async (req, res) => {
    const users = await userModel.find({});
    res.send(users);
})

userRouter.get('/profile', async (req, res) => {
    res.send(req.user)
});

userRouter.patch('/profile/edit', async (req, res) => {
    // req.user.username = req.body.username
    // req.user.password = req.body.password
    // await req.user.save()
    // res.send(req.user);
    const { song } = req.body
    const {username} = req.user.username

    // Tim xem co user khong findOne
    // Neu co thi xoa
    // Update role cho user nay updateOne
    // await userModel.updateOne({username}, {role})
    // const user = await userModel.findOne({username})
    // const user = await userModel.findOneAndUpdate({username}, {role}, {new: true})
    // const user = await userModel.findOneAndUpdate({ username }, { $push: { songs: song } }, { new: true })
    
    const user = await userModel.findOne({username:username})
    console.log(user.songs)
    user.songs.push(song)
    await user.save()
    console.log(user.songs)
    // Gui lai user duoc update cho client
    res.send(user)

});

module.exports = { userRouter };