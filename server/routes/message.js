const router = require('express').Router();

const getAll = require("../controller/messages");
const getLastMessages = require('../controller/messages/getLastMessages');
const {destroyAll} = require("../controller/messages/destroy");

router.get('/:authUser', getAll);
router.get('/lastMessage/:authUser', getLastMessages);
router.delete('/:authUser', destroyAll);


module.exports = router;