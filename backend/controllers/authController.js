const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    try {
        const { username, email, pwd } = req.body;
        if (!(username || email) || !pwd) return res.status(400).json({ 'message': 'Username/email and password are required.' });
        
        var foundUser = await User.findOne({ username: username }).exec();
        if (!foundUser) {
            foundUser = await User.findOne({ email: email }).exec();
            if (!foundUser) return res.sendStatus(401).json({ 'message': 'User not found' });; //Unauthorized 
        }// evaluate password 
        const match = await bcrypt.compare(pwd, foundUser.password);
        if (match) {
            const roles = Object.values(foundUser.roles).filter(Boolean);
            // create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            const refreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
                );
            const user_info = {
                username: foundUser.username,
                email: foundUser.email
            }
            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result);
            console.log(roles);

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); // put back "secure: true"

            // Send authorization roles and access token to user
            res.json({ roles, accessToken , user_info});

        } else {
            res.sendStatus(401).json({ 'message': 'password is wrong.' });;
        }  
    } catch (err) {
        console.log(err);
    }
}

module.exports = { handleLogin };