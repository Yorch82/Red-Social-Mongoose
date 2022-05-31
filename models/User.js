const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    mail:{ type: String, unique: true },
    avatar: String,
    password: String,
    // token: [],
    is_active: Boolean,
    is_admin: Boolean,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;