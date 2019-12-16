const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

function validateProject() {
  
    return (req, res, next) => {

        const { name, description } = req.body;

        if (!name || !description) {
            res.status(400).json({ errorMessage: "Please provide name and description for the project." })
        }

        next()
    }
}

function validateProjectID() {
    return (req, res, next) => {
      projects.get(req.params.id)
        .then(project => {
          if (project) {
            req.project = project
            next()
          } else {
            res.status(404).json({ message: "Project not found" })
          }
        })
        .catch(error => {
          res.status(500).json({
            message: "Error retrieving the project",
          })
        })
    }
}


function validateAction() {
  
    return (req, res, next) => {

        const {  description, notes } = req.body;

        if ( !description || !notes) {
            res.status(400).json({ errorMessage: "Please provide project_id, description and notes for the project." })
        }

        next()
    }
}

function validateActionID() {
    return (req, res, next) => {
      actions.get(req.params.action_id)
        .then(action => {
          if (action) {
            req.action = action
            next()
          } else {
            res.status(404).json({ message: "Action not found" })
          }
        })
        .catch(error => {
          res.status(500).json({
            message: "Error retrieving the project",
          })
        })
    }
}
  

module.exports = {
    validateProject,
    validateProjectID,
    validateAction,
    validateActionID,
    // validateProjectIDAct,
}