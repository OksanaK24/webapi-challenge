const express = require("express");
const projects = require("../data/helpers/projectModel");

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

module.exports = router;