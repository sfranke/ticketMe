var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(!req.session.user) {
        return res.redirect('/register');
    }
    console.log('session:', req.session);
    res.render('dashboard', {title: 'Dashboard', session: req.session});
});

module.exports = router;