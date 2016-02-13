var express  = require('express');
var router   = express.Router();
var database = require('./database');
var bcrypt   = require('bcrypt');

router.get('/', function (req, res, next) {
    console.log('Session:', req.session);
    res.render('login', { title: 'Express', session: req.session});
});

router.post('/', function (req, res, next) {
    var user = {'email': req.body.email, 'password': req.body.password};
        
    database.getUser(user, function (error, user) {

        // console.log('error', error);
        // console.log('user', user);

        if (user != null) {
            if (bcrypt.compareSync(req.body.password, user.password) == true) {
                console.log('Password correct!');
                req.session.user = user;
                res.redirect('/dashboard');
            } else {
                console.log('Wrong password!');
                return res.redirect('/register');
            }
        } else {
            return res.redirect('/register');
        }
    });
});

function verifyHashedPassword (password, callback) {
    var verifyiedHashedPassword = bcrypt.compareSync(password, databasePassword);

    // console.log('verifyied hashed password:', verifyiedHashedPassword);
    
    callback(null, verifyiedHashedPassword);
};

module.exports = router;
