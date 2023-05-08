const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const verifyUser = async (req, res) => {
        if (!req?.body?.username || !req?.body?.password) {
            return res.status(404).json({ "message": "missing details" });
        }
        const username = req.body.username;
        const password = req.body.password;
        const result = await Users.findOne({ username }).exec();
        if (!result) {
            return res.status(401).json({ "message": "you are not registered" });
        }
        else {
            const match = await bcrypt.compare(password, result.password);
            if (match) {
                return res
                  .status(200)
                  .json(
                      result
                  );
            }
            else {
                res.status(401).json({ "message": "Incorrect Password" });
            }
            
        }
    }

module.exports = verifyUser;