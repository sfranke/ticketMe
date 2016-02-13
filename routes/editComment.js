var express = require('express');
var router = express.Router();
var database = require('./database');
var util = require('util');
var colors = require('colors');

router.get('/', function (req, res, next) {

    console.log('Session:', req.session);
    res.render('editComment', { title: 'Edit comment', session: req.session});
});

router.post('/', function (req, res, next) {

    // console.log('Username:', req.session.user.name);
    // console.log('comment:', req.body.comment);
    // console.log('ticketId:', req.body.ticketId);

    database.addComment(req.session.user.name, req.body.ticketId, req.body.comment, function(error, doc) {

        if (error) return error;
        console.log(colors.bold('Record:', util.inspect(doc)));
        io.emit('commentUpdate', doc);
        return res.redirect('/tickets');
    });

});

module.exports = router;
