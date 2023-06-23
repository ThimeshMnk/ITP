const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

// ADD PROJECT
router.post("/create", protect, createProject);

// GET PROJECTS
router.get("/getProjects", protect, getProjects);

module.exports = router;
