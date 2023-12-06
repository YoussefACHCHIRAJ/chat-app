const router = require('express').Router();
const getUsers = require("../controller/users");

router.get('/userslist', getUsers);


module.exports = router;
