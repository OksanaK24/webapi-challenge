const express = require("express");
const actions = require("../data/helpers/actionModel");
const { validateProjectID } = require("../middleware/validate");

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

module.exports = router;