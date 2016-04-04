var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');
var configDb = require('../config/db.js');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, user) {
        done(err, user);
    });
});

// show login form
router.get('/login', function(req, res, next) {
    var messages = req.session.messages || [];
    req.session.messages = [];
    if (req.isAuthenticated()) {
        res.redirect('/auth/login');
    }
    else {
        res.render('auth/login', {
            title: 'Login',
            user: req.user,
            messages: messages
        });
    }
});

// validate user
 router.post('/login', passport.authenticate('local', {
    successRedirect: '/restaurants',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'
}));

// show registration form
router.get('/register', function(req, res, next) {
   res.render('auth/register', {
    title: 'Register'
   });
});

// show welome page for authenticated users
router.get('/welcome', isLoggedIn, function(req, res, next) {
   res.render('auth/welcome', {
       title: 'Welcome',
       user: req.user
   });
});

// save new user
router.post('/register', function(req, res, next) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
           return res.render('auth/register', { title: 'Register' });
        }
        else {
            res.redirect('/auth/login');
        }
    });
});

// logout
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/auth/login');
});

// check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
}

module.exports = router, passport;