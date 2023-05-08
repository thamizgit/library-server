const bcrypt = require('bcrypt');
const Users = require('../models/Users');
const createUser = async (req, res) => {
    if (!req?.body?.username || !req?.body?.password) {
        return res.status(404).json({"message":"username and password required"})
    }
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);

    const duplicate = await Users.find({ username }).exec();
    console.log(duplicate);
    if (duplicate.length)
        return res.status(409).json({ "message": "username already exists" });
    try {
        const result = await Users.create({
            username, password,recents:[],favourites:[]
        });
        console.log(result);
        res.status(201).json({"message":"User created"})
    }
    catch (err) {
        res.status(500).json({ err });
    }
}
module.exports = { createUser };