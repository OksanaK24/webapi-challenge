const express = require("express");
const actions = require("../data/helpers/actionModel");
const { validateProjectIDAct, validateAction, validateActionID } = require("../middleware/validate");

const router = express.Router();

router.get('/', validateProjectIDAct(), (req, res) => {
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

router.post('/', validateProjectIDAct(), validateAction(), (req, res) => {
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

router.put("/:id", validateProjectIDAct(), validateAction(), validateActionID(), (req, res) => {
    actions
        .update(req.action.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            next(error)
        })
})

router.delete("/:id", validateProjectIDAct(), validateActionID(), (req, res) => {
    actions
        .remove(req.action.id)
        .then(() => {
            res.status(200).json({ message: "The action has been removed" })
        })
        .catch(error => {
            next(error)
        })
})

module.exports = router;