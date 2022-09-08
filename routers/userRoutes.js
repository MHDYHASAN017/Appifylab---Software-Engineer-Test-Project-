
const express = require("express");
const router = express.Router();
const { isAuthValid } = require("../middlewares/isAuthValid");
const {
  registerUser,
  loginUser,
  currentUser,
  deleteUser , 
  allUsers
} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current_user", isAuthValid, currentUser);

router.get("/all-users", isAuthValid, allUsers);
router.delete("/delete-user/:id", isAuthValid, deleteUser);

module.exports = router;