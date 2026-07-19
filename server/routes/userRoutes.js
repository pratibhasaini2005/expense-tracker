const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/test", (req, res) => {
  res.send("User Route Working");
});

router.put("/profile", protect, updateProfile);

module.exports = router;