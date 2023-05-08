const Book = require('../models/Book');
const Users = require('../models/Users');
const addFav = async (req, res) => {
    if (!req?.body?.id || !req?.body?.username) {
        return res.status(404).json({ "message": "id required" });
    }
    try {
        const username = req.body.username;

        const result = await Users.find({ username }).exec();
        console.log(result);
        if (result) {
            const id = req.body.id;
            await Users.updateOne({ username }, { $push: { favourites: id } });
            res.status(204).json({ "message": "added to favourites" });
        }
    }
    catch (err) {
        res.status(500).json({err});
    }
}
const removeFav = async (req, res) => {
    if (!req?.body?.id || !req?.body?.username) {
        return res.status(404).json({ "message": "id and username required" });
    }
    try {
        const username = req.body.username;

        const result = await Users.find({ username }).exec();
        console.log(result);
        if (result) {
            const id = req.body.id;
            await Users.updateOne({ username }, { $pull: { favourites: id } });
            res.status(204).json({ "message": "removed from favourites" });
        }
    }
    catch (err) {
        res.status(500).json({err});
    }
}
const getFav =  async (req, res) => {
    const username = (req.params.username).toString();
    try {
        const user = await Users.findOne({ username }).exec();
        if (user) {
            const favArr = user.favourites;
            const result = await Book.find({ _id: { $in: favArr } }).exec();
            res.status(200).json(result);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}
const addRecents = async (req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    try{
    const found = await Users.find({ recents: { $in: [id] } });

   
        if (found)
            await Users.updateOne({ username }, { $pull: { recents: id } }).exec();
        await Users.updateOne({ username }, { $push: { recents: { $each: [id], $position: 0 } } }).exec();
        res.status(200).json("recents updated");
    }
    catch (err) {
        console.log(err);
    }
}
const getRecents = async (req, res) => {
    const username = (req.params.username).toString();
    try {
      const user = await Users.findOne({ username }).exec();
      if (user) {
          const recentArr = user.recents;
          const result = [];
          for (const num of recentArr) {
            const book = await Book.findById(num).exec();
            if (book) {
              result.push(book);
              }
              if (result.length >= 10)
                  break;
          }
        res.status(200).json(result);
      }
    } catch (err) {
      res.status(500).json(err);
    }
}
module.exports = { addFav, removeFav,getFav,getRecents,addRecents };