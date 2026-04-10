import { useState } from "react";

const TaskPanel = ({ tasks, students, onAddTask, onToggleTask }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    studentId: "",
    dueDate: "",
  });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.studentId) {
      return;
    }

    onAddTask({
      title: form.title.trim(),
      description: form.description.trim(),
      studentId: form.studentId,
      dueDate: form.dueDate || undefined,
    });

    setForm({ title: "", description: "", studentId: "", dueDate: "" });
  };

  return (
    <section className="card panel-card">
      <div className="panel-head">
        <h2>Task / Assignment Management</h2>
        <p className="panel-subtitle">Assign homework and track completion status.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-grid compact">
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <select name="studentId" value={form.studentId} onChange={handleChange} required>
          <option value="">Select student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name} (Class {student.className})
            </option>
          ))}
        </select>
        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
          rows="3"
        />

        <button type="submit" disabled={students.length === 0}>
          Assign Task
        </button>
      </form>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-note">No tasks assigned yet.</p>
        ) : (
          tasks.map((task) => (
            <article key={task._id} className={`task-item ${task.isCompleted ? "done" : ""}`}>
              <header>
                <h3>{task.title}</h3>
                <button
                  type="button"
                  className={task.isCompleted ? "ghost" : "success"}
                  onClick={() => onToggleTask(task._id, !task.isCompleted)}
                >
                  {task.isCompleted ? "Completed" : "Mark Complete"}
                </button>
              </header>

              <p>{task.description || "No description"}</p>

              <small>
                Student: {task.student?.name || "Unknown"} | Class: {task.student?.className || "-"}
              </small>
              <small>
                Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}
              </small>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default TaskPanel;
