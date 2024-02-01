const router = require('express').Router();

const getAll = require("../controller/messages");
const getLastMessages = require('../controller/messages/getLastMessages');
const {destroyAll} = require("../controller/messages/destroy");

router.get('/messages/:authUser', getAll);
router.get('/messages/lastMessage/:authUser', getLastMessages);
router.delete('/messages/:authUser', destroyAll);


module.exports = router;