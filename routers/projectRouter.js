const express = require("express");
const projects = require("../data/helpers/projectModel");
const { validateProject, validateProjectID } = require("../middleware/validate");

const router = express.Router();

router.get('/', (req, res) => {
    projects
        .get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch((error) => {
            next(error)
        })
  })

router.post('/', validateProject(),  (req, res) => {
    console.log(req.body)
    projects
        .insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch((error) => {
            next(error)
        })
})

router.put("/:id", validateProjectID(), validateProject(), (req, res) => {
    projects
        .update(req.project.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            next(error)
        })
  })

module.exports = router;