const Project = require("../models/Project.model");
const User = require("../models/User.model");

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    const {
      projectName,
      company,
      credits,
      team,
      deadline,
      startDate,
      description,
    } = req.body;

    // Check if the same project name exists
    const projectExists = await Project.findOne({ projectName });
    if (projectExists) {
      res.status(401).json({
        errorMessage:
          "Project name already exists! Please choose another name.",
        status: false,
      });
    } else {
      const project = await Project.create({
        projectName,
        company,
        credits,
        team,
        deadline,
        startDate,
        description,
        projectLeader: req.user.id,
        status: "Not Started",
      });
      if (project) {
        res.status(200).json({
          data: "Project created successfully",
          status: true,
        });
      } else {
        res.status(401).json({
          errorMessage: "Failed to create the project!",
          status: false,
        });
      }
    }
  } catch (e) {
    res.status(401).json({
      errorMessage: "Something went wrong!\n" + e,
      status: false,
    });
  }
};

// GET PROJECT DETAILS
const getProjects = async (req, res) => {
  await Project.find({ projectLeader: req.user.id }, { projectLeader: 0 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { createProject, getProjects };
