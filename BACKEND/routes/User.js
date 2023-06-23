const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  registerUser,
  getUser,
  login,
} = require("../controllers/userController");

//REGISTER
router.post("/register", registerUser);

// GET USER
router.get("/get", protect, getUser);

//LOGIN
router.post("/login", login);

module.exports = router;
