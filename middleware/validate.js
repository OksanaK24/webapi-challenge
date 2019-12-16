const projects = require("../data/helpers/projectModel");

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
  

module.exports = {
    validateProject,
    validateProjectID,
}