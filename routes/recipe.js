const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User = require('../models/user');

const { isLoggedIn } = require('../helpers/middleware');

router.post('/:recipeID', isLoggedIn(), (req, res, next) => {
    console.log('recipe ID', req.params.recipeID)
    let recipeID = req.params.recipeID;
    console.log('user id', req.session.currentUser)
    let userID = req.session.currentUser._id
    User.findById(userID)
        .then(user => {
            user.favourites.push(recipeID)
            return user.save()
        })
        .then(savedUser => {
            res.status(200)
            res.json(savedUser);
        })
        .catch(error => {
            next(error);
        })
})

module.exports = router;