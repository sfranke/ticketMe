var express = require('express');
var router = express.Router();
var database = require('./database');
var util = require('util');
var bcrypt   = require('bcrypt');

router.get('/', function (req, res, next) {
    // console.log(req.session);
    res.render('register', { title: 'Register', session: req.session, message: req.flash('signupMessage')});
});

router.post('/', function (req, res, next) {
    if (req.body.email != '' && req.body.name != '' && req.body.password != '') {
        var user = {'name': req.body.name, 'email': req.body.email, 'password': req.body.password};

        generateHashedPassword(req.body.password, function (error, password) {
            user.password = password;
            database.saveUser(user, function (error, user) {
                if (user != null) {
                    req.session.user = user;
                    res.redirect('/dashboard');
                } else {
                    return res.redirect('/register', 422, {message: req.flash('signupMessage', 'That email is already taken')});
                }
            });
        });
    }
});

function generateHashedPassword (password, callback) {
    var hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(9));
    // console.log('Hashed password:', hashedPassword);
    callback(null, hashedPassword);
};

module.exports = router;
