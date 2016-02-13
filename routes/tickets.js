var express = require('express');
var router = express.Router();
var database = require('./database');

router.get('/', function (req, res, next) {

    // console.log('Session:', req.session);

    if(!req.session.user) {
        return res.redirect('/register');
    }
    
    database.getAllTickets(function (error, tickets) {

        // console.log('tickets error:', error);
        // console.log('tickets:', tickets);

        res.render('tickets', { title: 'Tickets', session: req.session, tickets: tickets}); 
    });
});

router.post('/complete/:id', function (req, res, next) {

    // console.log('Session:', req.session);

    if(!req.session.user) {
        return res.redirect('/register');
    }

    // console.log('complete/:id req.params:', req.params);

    database.completeTicket(req.params.id, function (error, success) {

        // console.log('Route tickets error:', error);
        // console.log('Route tickets success:', success);

        if (success.update != 'success') res.json({message: 'fail'});
        res.json({message: 'success'});
        // console.log('=====>>', req.params);
        io.emit('ticketStatusChangedToComplete', req.params);

    });
});

router.post('/reopen/:id', function (req, res, next) {

    // console.log('Session:', req.session);

    if(!req.session.user) {
        return res.redirect('/register');
    }

    // console.log('reopen/:id req.params:', req.params);

    database.reopenTicket(req.params.id, function (error, success) {

        // console.log('Route tickets error:', error);
        // console.log('Route tickets success:', success);

        if (success.update != 'success') res.json({message: 'fail'});
        res.json({message: 'success'});
        io.emit('ticketStatusChangedToOpen', req.params);

    });
});

router.post('/close/:id', function (req, res, next) {

    // console.log('Session:', req.session);

    if(!req.session.user) {
        return res.redirect('/register');
    }

    // console.log('close/:id req.params:', req.params);

    database.closeTicket(req.params.id, function (error, success) {

        // console.log('Route tickets error:', error);
        // console.log('Route tickets success:', success);

        if (success.update != 'success') res.json({message: 'fail'});
        res.json({message: 'success'});
        io.emit('ticketStatusChangedToClose', req.params);

    });
});

module.exports = router;
