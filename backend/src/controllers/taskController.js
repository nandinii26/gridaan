const Task = require("../models/Task");
const Student = require("../models/Student");

const getTasks = async (_req, res) => {
  try {
    const tasks = await Task.find()
      .populate("student", "name className section")
      .sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, studentId, dueDate } = req.body;

    if (!title || !studentId) {
      return res.status(400).json({ message: "Title and student are required" });
    }

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const task = await Task.create({
      title,
      description,
      student: studentId,
      dueDate,
    });

    const populated = await task.populate("student", "name className section");

    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create task" });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    const task = await Task.findById(id).populate("student", "name className section");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isCompleted = Boolean(isCompleted);
    const updated = await task.save();

    const populated = await updated.populate("student", "name className section");

    return res.status(200).json(populated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update task status" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
};
