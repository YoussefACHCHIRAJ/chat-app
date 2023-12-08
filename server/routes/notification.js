const router = require('express').Router();

// const store = require("../controller/notifications/store");
const getAll = require("../controller/notifications");
const destroy = require("../controller/notifications/destroy");

router.get('/notifications/:id', getAll);
router.delete("/notifications/:receiver", destroy);


module.exports = router;