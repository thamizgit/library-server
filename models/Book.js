const mongoose = require('mongoose');

const schema = mongoose.Schema;

const BookSchema = new schema({
    title: String,
    author: String,
    img: String,
    date: Date,
    rating: Number,
    genre: String
})

module.exports = mongoose.model("Book", BookSchema);