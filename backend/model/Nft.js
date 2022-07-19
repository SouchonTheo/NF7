const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nftSchema = new Schema({
    account: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    couleur: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Nft', nftSchema);