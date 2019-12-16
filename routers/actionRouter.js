const express = require("express");
const actions = require("../data/helpers/actionModel");
const { validateProjectID, validateAction, validateActionID } = require("../middleware/validate");

const router = express.Router({ mergeParams: true });

router.get("/", validateProjectID(), (req, res) => {
    actions
        .get(req.project.id)
        .then(action => {
            // console.log(action)
            res.status(200).json(action)
        })
        .catch((error) => {
            next(error)
        })
})

router.post("/", validateProjectID(), validateAction(), (req, res) => {
    console.log(req.body);
    newAction ={
        project_id: req.params.id,
        description: req.body.description,
        notes: req.body.notes
    }
    actions
        .insert(newAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch((error) => {
            next(error)
        })
})

router.put("/:action_id", validateProjectID(), validateAction(), validateActionID(), (req, res) => {
    editedAction ={
        project_id: req.params.id,
        description: req.body.description,
        notes: req.body.notes
    }

    actions
        .update(req.params.action_id, editedAction)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            next(error)
        })
})

router.delete("/:action_id", validateProjectID(), validateActionID(), (req, res) => {
    actions
        .remove(req.params.action_id)
        .then(() => {
            res.status(200).json({ message: "The action has been removed" })
        })
        .catch(error => {
            next(error)
        })
})

module.exports = router;