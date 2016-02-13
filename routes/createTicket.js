var express = require('express');
var router = express.Router();
var database = require('./database');
var async = require('async');

function unixTime() {
    var unixStamp = Math.round((new Date()).getTime() / 1000);
    return unixStamp;
};

router.get('/', function (req, res, next) {
    
    console.log('Session:', req.session);

    /* A list of all categories. */
    var category = ['Task', 'Bug'];
    /* A list of all usernames. */
    var assignee = [];

    /* A list of all departments. */
    var department = ['QC-1', 'QC-100', 'QC-200'];

    if(!req.session.user) {
        return res.redirect('/register');
    }

    database.getAllUsers(function (error, users) {

        // console.log('Get all users error:', error);
        // console.log('Get all users userlist:', users);
        
        res.render('createTicket', { title: 'Create a ticket',
                                    session: req.session,
                                    message: req.flash('ticketMessage'),
                                    categories: category,
                                    assignees: users,
                                    departments: department
                                    });
    });
});

router.post('/', function (req, res, next) {

    // console.log(req.body);

    var ticketDetails = req.body;
    
    /* A count of all tickets from the database +1. */
    var ticketNumber = '';

    async.series({
            
            one: function (callback) {
                database.getTicketCount(function (error, count) {

                    // console.log('getTicketCount error:', error);
                    // console.log('getTicketCount count:', count);

                    ticketDetails.number = ++count;
                    callback();
                });
            },

            two: function(callback) {
                ticketDetails.status = 'open';
                ticketDetails.creator = req.session.user.name;
                ticketDetails.comments = [];
                callback();

            },
            
            three: function(callback) {
                ticketDetails.created = new Date();
                callback();
            }
        },
        function (error, result) {

            // console.log('My ticket:\n', ticketDetails);

            database.saveTicket(ticketDetails, function (error, response) {

                // console.log('saveTicket error:', error);
                // console.log('saveTicket response:', response);
                // console.log('=====================\n', response.ops[0]);

                io.emit('newTicketCreated', response.ops[0]);
                
                return res.redirect('/createTicket', 200, req.flash('ticketMessage', 'Ticket created!'));
            });

        });
});

module.exports = router;
