const express = require("express");
const actions = require("../data/helpers/actionModel");
const { validateProjectID, validateAction } = require("../middleware/validate");

const router = express.Router();

router.get('/', validateProjectID(), (req, res) => {
    actions
        .get()
        .then(action => {
            console.log(action)
            res.status(200).json(action)
        })
        .catch((error) => {
            next(error)
        })
})

router.post('/', validateProjectID(), validateAction(), (req, res) => {
    console.log(req.body)
    actions
        .insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch((error) => {
            next(error)
        })
})

module.exports = router;