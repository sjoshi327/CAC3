let express = require('express');
let router = express.Router();

//requiring the model classes
let requester = require('../models/requester');

//get new access data
router.get('/findemployee', function(req, res, next) {
    requester.find({}, function(err, data) {
        res.json(data);
    });
});

//get employee by id
router.get('/findemployeebyid/:id', function(req, res, next) {
    requester.findOne({ employeeID: req.params.id }, function(err, data) {
        res.json(data);
    });
});

//update form by employee id
router.put('/update/:employeeID', (req, res) => {
    requester.update({
            employeeID: req.params.employeeID
        }, {
            $set: {
                zone: req.body.zone,
                accessType: req.body.accessType,
                prev: req.body.prev,
                current: req.body.current,
                issuedBy: req.body.issued,
                issueDate: req.body.datepickerModel,
                cardno: req.body.accessCard
            }
        }, { upsert: true },
        (err, empp) => {
            if (err)
                throw err
            else {
                res.json(empp)
            }
        })
})

//post employee details in the form
router.post('/insert', function(req, res, next) {
    requester.create(req.body).then(function(data) {
        res.send(data)
    })
})

//show the employee data
router.get('/show', function(req, res, next) {
    requester.find({}, function(err, data) {
        res.json(data);
    });
})

module.exports = router;