require('dotenv').config();
const PORT = 3500 || process.env.PORT;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./config/dbConn');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectDB();

app.use('/books', require('./routes/books'));

app.use('/books/filterByTitle', require('./routes/filterByTitle'));
app.use("/books/filterByAuthor", require("./routes/filterByAuthor"));
app.use('/books/filterByDate', require("./routes/filterByDate"));
app.use('/books/filterByFav', require('./routes/filterByFav'));

app.use("/books/addfav", require('./routes/addfav'));
app.use("/books/removefav", require('./routes/removefav'));
app.use("/books/recents", require('./routes/recents'));

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));


mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
        console.log("DataBase Connected");
    })
})
