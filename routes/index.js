var express = require('express');
var router = express.Router();
var database = require('./database');
var util = require('util');
var io = require('socket.io')();

router.get('/', function (req, res, next) {
    // console.log('Session:', req.session);
    res.render('index', { title: 'Express', session: req.session});
});

module.exports = router;
