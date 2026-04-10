const Student = require("../models/Student");

const getStudents = async (_req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch students" });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, className, section } = req.body;

    if (!name || !className) {
      return res.status(400).json({ message: "Name and class are required" });
    }

    const student = await Student.create({
      name,
      className,
      section,
    });

    return res.status(201).json(student);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create student" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, className, section } = req.body;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.name = name ?? student.name;
    student.className = className ?? student.className;
    student.section = section ?? student.section;

    const updated = await student.save();

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update student" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.deleteOne();

    return res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete student" });
  }
};

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
