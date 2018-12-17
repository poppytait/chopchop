const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User = require('../models/user');
const Recipe = require('../models/recipe');

const { isLoggedIn } = require('../helpers/middleware');

router.post('/', isLoggedIn(), (req, res, next) => {
    console.log('user id', req.session.currentUser)
    let userID = req.session.currentUser._id
    let recipe = req.body;

    const p1 = Recipe.create(recipe)
        .then(recipeResult => {
            console.log(recipeResult)
            return recipeResult._id;
        })

    const p2 = User.findById(userID);

    Promise.all([p1, p2]).then(values => {
        const recipeId = values[0];
        const user = values[1];
        user.favourites.push(recipeId);
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

router.get('/', isLoggedIn(), (req, res, next) => {
    let userID = req.session.currentUser._id;
    User.findById(userID)
        .then(user => {
            return user.favourites;
        })
        .then(favourites => {
            res.status(200)
            res.json(favourites);
        })
        .catch(error => {
            next(error);
        })
})

module.exports = router;