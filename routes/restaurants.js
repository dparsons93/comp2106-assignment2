var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');
var passport = require('passport');

// handler for main restaurants page
router.get('/', function(req, res, next) {
    Restaurant.find(function (err, restaurants) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('restaurants/index', {
                title: 'Restaurants',
                restaurants: restaurants
            });
        }
    });
});

// handler for add.ejs to display a blank form
router.get('/add', isLoggedIn, function(req, res, next) {
    res.render('restaurants/add', {
        title: 'Add a New Restaurant'
    });
});

// handler for add.ejs to process the form
router.post('/add', isLoggedIn, function(req, res, next) {
    Restaurant.create( {
        name: req.body.name,
        type: req.body.type,
        owner: req.body.owner,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
        }
    );
    res.redirect('/restaurants');
});

// handler for edit.ejs to show populated form
router.get('/:id', isLoggedIn, function(req, res, next) {
    var id = req.params.id;
    Restaurant.findById(id,  function(err, restaurant) {
       if (err) {
           console.log(err);
           res.end(err);
       }
        else {
           res.render('restaurants/edit', {
               title: 'Restaurant Details',
               restaurant: restaurant
           });
       }
    });
});

// handler for edit.ejs to update restaurant
router.post('/:id', isLoggedIn, function(req, res, next) {
    var id = req.params.id;
    var restaurant = new Restaurant( {
        _id: id,
        name: req.body.name,
        type: req.body.type,
        owner: req.body.owner,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    });
    Restaurant.update( { _id: id }, restaurant,  function(err) {
        if (err) {
            console.log(err)
            res.end(err);
        }
        else {
            res.redirect('/restaurants');
        }
    });
});

// handler to delete
router.get('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    Restaurant.remove({ _id: id}, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/restaurants');
        }
    });
});

// check if user is logged in
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
}

module.exports = router;