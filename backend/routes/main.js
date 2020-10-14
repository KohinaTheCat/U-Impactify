/*
boiler
*/

const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(v => res.json(v))
    .catch(err => res.status(400).json('Error ' + err))
})

// adding user
router.route('/').post((req, res) =>{
    const username = req.body.username;

    // populate with finalized schema
    const newUser = new User({
        username,
    })

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
    .then(v => res.json(v))
    .catch(err => res.status(400).json('Error ' + err))
})

//deleting transaction
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('deleted'))
    .catch(err => res.status(400).json('Error ' + err))
})

//editing transaction
router.route('/update/:id').post((req, res) =>{
    User.findById(req.params.id)
    .then(v =>{
        v.username = req.body.username;
        //find the current main and update it
        //we overwrite the old main with new data

        v.save()
        .then(() => res.json('updated'))
        .catch(err => res.status(400).json('Error ' + err))
    })
})

module.exports = router;