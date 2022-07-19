const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.post('/delete', usersController.deleteUser);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);


router.put('/username', usersController.updateUsername);

router.put('/email', usersController.updateEmail);

router.put('/pwd', usersController.updatePwd);


module.exports = router;