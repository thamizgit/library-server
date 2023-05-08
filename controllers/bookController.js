const Book = require('../models/Book');
function capitalizeWords(sentence) {
  const words = sentence.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
}
const getBooks = async (req, res) => {
    const result = await Book.find({});
    res.status(200).send(result);
}
const postBooks = async (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const img = req.body.img;
    const date = new Date(req.body.date);
    const rating = req.body.rating;
    const genre = req.body.genre;

    try {
        const result = await Book.create({
            title,
            author,
            img,
            date,
            rating,
            genre
        });
        console.log(result);
        res.status(201).json({ "message": "Book uploaded" });
    }
    catch (err) {
        console.log(err);
    }

}
const filterByTitle = async (req, res) => {
    if (!req?.body?.title) {
        res.status(404).json({ "message": "title required" });
        return;
    }
    const title =capitalizeWords(req.body.title);

    try {
        const result = await Book.find({ title: { $regex: title } }).exec();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}
const filterByAuthor = async (req, res) => {
  if (!req?.body?.author) {
    res.status(404).json({ message: "author required" });
    return;
  }
  const author = capitalizeWords(req.body.author);
  try {
    const result = await Book.find({
      author: { $regex: author },
    }).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const filterByDate = async (req, res) => {
    if (!req?.body?.startdate || !req?.body?.enddate) {
        return res.status(404).json({ "message": "start and end dates required" });
    }
    const start = req.body.startdate;
    const end = req.body.enddate;

    try {
        const result = await Book.find({ date: { $gte: new Date(start), $lte: new Date(end) } });

        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const slowFetch = async (req,res) => {
    if (!req?.body?.skip) {
        return res.status(404).json({ "message": "skip is necessary" });
    }
    try {
        const result = await Book.find().limit(8).skip(req.body.skip).exec();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
module.exports = {getBooks,postBooks,filterByTitle,filterByAuthor,filterByDate,slowFetch}