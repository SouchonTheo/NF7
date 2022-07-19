const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    try {
        const { username, email, meta, pwd } = req.body;
        if (!username || !pwd || !email) return res.status(400).json({ 'message': 'Username and password are required.' });

        // check for duplicate usernames in the db
        const duplicateUser = await User.findOne({ username: username }).exec();
        const duplicateEmail = await User.findOne({ email: email }).exec();
        if (duplicateUser || duplicateEmail) return res.sendStatus(409); //Conflict 
        
        try {
            //encrypt the password
            const hashedPwd = await bcrypt.hash(pwd, 10);

            //create and store the new user
            const result = await User.create({
                "username": username,
                "email": email,
                "meta": meta.toLowerCase(),
                "password": hashedPwd
            });
            
            console.log(result);
            
            res.status(201).json({ 'success': `New user ${username} created!` });
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { handleNewUser };