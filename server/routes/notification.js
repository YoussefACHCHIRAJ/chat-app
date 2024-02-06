const router = require('express').Router();

const getAll = require("../controller/notifications");
const destroy = require("../controller/notifications/destroy");

router.get('/:authUser', getAll);
router.delete("/:authUser", destroy);


module.exports = router;