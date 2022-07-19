const User = require('../model/User');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}


const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const deleteUser = async (req, res) => {
    try {
        if (!req?.body?.username) return res.status(400).json({ "message": 'Username required' });
        const user = await User.findOne({ username: req.body.username }).exec();
        if (!user) {
            return res.status(204).json({ 'message': `Username ${req.body.username} not found` });
    }
    if (req.body?.pwd) {
        if (await bcrypt.compare(req.body.pwd, user.password)) {
            const result = await user.deleteOne({ usesrname: req.body.username });
            res.json(result);
        } else {
            return res.status(401).json({ "message": `Wrong password for this user.` });
        }
    } else {
        return res.status(400).json({ 'message': 'password is required.' });
    }
    } catch (err) {
        console.log(err);
    }
}


const updateUsername = async (req, res) => {
    try {
        if (!req?.body?.email) {
            return res.status(400).json({ 'message': 'email is required.' });
        }
        const userAlready = await User.findOne({ email: req.body.username }).exec();
        if (!userAlready) {
            return res.status(409).json({ "message": `There already is a user with this username : ${req.body.username}.` });
        }


        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) {
            return res.status(204).json({ "message": `No user matches this email ${req.body.email}.` });
        }
        if (req.body?.pwd) {
            if (await bcrypt.compare(req.body.pwd, user.password)) {
                if (req.body?.username) user.username = req.body.username;
                if (req.body?.email) user.email = req.body.email;
                const result = await user.save();
                res.json(result);
            } else {
                return res.status(401).json({ "message": `Wrong password for this user.` });
            }
        } else {
            return res.status(400).json({ 'message': 'password is required.' });
        }
    } catch (err) {
        console.log(err);
    }
}

const updateEmail = async (req, res) => {
    try {
        if (!req?.body?.username) {
            return res.status(400).json({ 'message': 'username is required.' });
        }
        const userAlready = await User.findOne({ email: req.body.email }).exec();
        if (!userAlready) {
            return res.status(409).json({ "message": `There already is a user with this email : ${req.body.email}.` });
        }
        const user = await User.findOne({ username: req.body.username }).exec();
        if (!user) {
            return res.status(204).json({ "message": `No user matches this username ${req.body.username}.` });
        }
        if (req.body?.pwd) {
            if (await bcrypt.compare(req.body.pwd, user.password)) {
                if (req.body?.username) user.username = req.body.username;
                if (req.body?.email) user.email = req.body.email;
                const result = await user.save();   
                res.json(result);
            } else {
                return res.status(401).json({ "message": `Wrong password for this user.` });
            }
        } else {
            return res.status(400).json({ 'message': 'password is required.' });
        }
    } catch (err) {
        console.log(err);
    }
}


const updatePwd = async (req, res) => {
    try {
        if (!req?.body?.username) {
            return res.status(400).json({ 'message': 'username or email is required.' });
        }
        const user = await User.findOne({ username: req.body.username }).exec();
        if (!user) {
            return res.status(204).json({ "message": `No user matches this username ${req.body.username}.` });
        }
        if (req.body?.oldPwd) {
            if (await bcrypt.compare(req.body.oldPwd, user.password)) {
                if (req.body?.username) user.username = req.body.username;
                if (req.body?.email) user.email = req.body.email;
                if (req.body?.newPwd) {
                    console.log("new pwd : ", req.body.newPwd);
                    user.password = await bcrypt.hash(req.body.newPwd, 10);
                    const result = await user.save();   
                    res.json(result);
                } else {
                    return res.status(400).json({ 'message': 'the new password is required.' });
                }
            } else {
                return res.status(401).json({ "message": `Wrong password for this user.` });
            }
        } else {
            return res.status(400).json({ 'message': 'password is required.' });
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUsername,
    updateEmail,
    updatePwd
}