const router = require('express').Router();
const getUsers = require("../controller/users");

router.get('/list', getUsers);


module.exports = router;
