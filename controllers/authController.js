const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Iuser = require('../models/iUser.model');

const handleLogin = async (req, res) => {
    const { password, username } = req.body;
    let foundUser;
    if (!username && !password) return res.status(400).json({ 'message': 'email and password are required.' });
    foundUser = await Iuser.findOne({ email: username }).exec();

    if (!foundUser) {
        return res.sendStatus(400); //Unauthorized 
    }

    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);

    // const match = (password==foundUser.password);
    const match1 = await bcrypt.compare(password, foundUser.password);

    if (match) {
        const roles = foundUser.roles;
        const _id = (foundUser._id);

        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles,
                    "_id": _id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ roles, accessToken, _id: foundUser.nic });
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };