const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    favourites: {
        type: Array
    },
    recents: {
        type: Array
    }
})

module.exports = mongoose.model("Users", UserSchema);