const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster30803.9qty4hw.mongodb.net/mindx')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: [String],
    songs :[{type: mongoose.Schema.Types.ObjectId, ref: 'songs'}]
});

const userModel = mongoose.model('users', userSchema);

module.exports = {userModel};