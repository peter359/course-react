var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = router;