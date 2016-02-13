var express = require('express');
var router = express.Router();
var database = require('./database');
var util = require('util');

router.get('/', function (req, res, next) {
    res.render('userAdd', { title: 'Register' });
});

router.post('/', function (req, res, next) {
    if (req.body.email != '' && req.body.name != '' && req.body.password != '') {
        var user = {'name': req.body.name, 'email': req.body.email, 'password': req.body.password};
        database.addNewUser(user, function (error, doc) {
            // console.log('error:', util.inspect(error));
            // console.log('doc:', util.inspect(doc));
            
            if(error != null) res.json({'status': error});
            res.json({'status': 'success'});
        });
    }
});

module.exports = router;
