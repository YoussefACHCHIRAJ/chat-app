const router = require('express').Router();

// const store = require("../controller/messages/store");

const getAll = require("../controller/messages");
const {destroyAll} = require("../controller/messages/destroy");

router.get('/messages/:userId', getAll);
router.delete('/messages/:userId', destroyAll);


module.exports = router;