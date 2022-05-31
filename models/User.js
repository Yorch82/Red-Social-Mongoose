const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    mail:{ type: String, unique: true },
    avatar: String,
    password: String,
    // token: [],
    confirmed: Boolean,
    is_admin: Boolean,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;