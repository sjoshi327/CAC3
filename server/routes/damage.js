let express = require('express');
let router = express.Router();
let mongoose = require('mongoose')

let damage = require('../models/damage');

//connection from mongo db database
mongoose.connect('mongodb://localhost:27017/centralAccess');
let db = mongoose.connection;

//get damage data
router.get('/finddamage', function(req, res, next) {
    damage.find({}, function(err, data) {
        res.json(data);
    });
});

//api for damged card
router.post('/damageInsert', function(req, res, next) {
    damage.create(req.body).then(function(data) {
        res.send(data);
    })
})

module.exports = router;