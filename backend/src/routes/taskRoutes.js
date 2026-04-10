const express = require("express");
const {
  getTasks,
  createTask,
  updateTaskStatus,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id/status", updateTaskStatus);

module.exports = router;
