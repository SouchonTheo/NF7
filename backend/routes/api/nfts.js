const express = require('express');
const router = express.Router();
const nftsController = require('../../controllers/nftsController');

router.route('/')
    .get(nftsController.getAllNFTs)
    .post(nftsController.createNewNFT);

router.route('/user')
    .post(nftsController.getNFTbyUser);

router.route('/:id')
    .get(nftsController.getNFT);

module.exports = router;