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

router.route('/').post((req, res) =>{
    const name = req.body.name;

    const newUser = new User({
        name,
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
        v.name = req.body.name;
        //find the current main and update it
        //we overwrite the old main with new data

        v.save()
        .then(() => res.json('updated'))
        .catch(err => res.status(400).json('Error ' + err))
    })
})

module.exports = router;