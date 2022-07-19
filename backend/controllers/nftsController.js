const Nft = require('../model/Nft');
const User = require('../model/User');

const getAllNFTs = async (req, res) => {
    try {
        const nfts = await Nft.find();
        if (!nfts) return res.status(204).json({ 'message': 'No nfts found.' });
        res.json(nfts);
    } catch (err) {
        console.log(err);
    }
}

const getNFTbyUser = async (req, res) => {
    try {
        console.log("request : ", req);
        const { username } = req.body;
        console.log("username : ", username);
        const user = await User.findOne({ username: username }).exec();
        console.log("user : ", user);

        const nfts = await Nft.find({ account: user.meta }).exec();
        console.log(nfts);
        if (!nfts) return res.status(204).json({ 'message': 'No nfts found.' });
        res.json(nfts);
    } catch (err) {
        console.log(err);
    }
}

const createNewNFT = async (req, res) => {
    try {
        const { metadata, signer } = req.body;

        console.log(metadata);
        console.log(signer);

        console.log(metadata.couleur);

        const { image, couleur, description, name } = metadata


        const user = await User.findOne({ meta: signer });

        
        const result = await Nft.create({
            "account": signer,
            "owner": user.username,
            "image": image,
            "couleur": couleur,
            "description": description,
            "name": name
        });

        console.log(result);

        res.status(201).json({ 'success': `New nft mint` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': err.message });
    }
}

const getNFT = async (req, res) => {
    try {
        if (!req?.params?.id) return res.status(400).json({ 'message': 'NFT ID required.' });
        
        const nft = await NFT.findOne({ _id: req.params.id }).exec();
        if (!nft) {
            return res.status(204).json({ "message": `No NFT matches ID ${req.params.id}.` });
        }
        res.json(nft);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllNFTs,
    getNFTbyUser,
    createNewNFT,
    getNFT
}