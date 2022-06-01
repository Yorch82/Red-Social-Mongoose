const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true, require: true },
    mail:{ type: String, unique: true, require: true },
    avatar: String,
    password: String,
    tokens: [],
    confirmed: Boolean,
    role: String,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;