const router = require('express').Router();
const getUsers = require("../controller/users");
const update = require('../controller/users/update');

router.get('/list', getUsers);
router.post("/update/:authUserId", update);


module.exports = router;
