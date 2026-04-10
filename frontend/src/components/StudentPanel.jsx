import { useMemo, useState } from "react";

const emptyForm = { name: "", className: "", section: "" };

const StudentPanel = ({ students, onAddStudent, onUpdateStudent, onDeleteStudent, loading }) => {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const submitLabel = useMemo(() => (editingId ? "Update Student" : "Add Student"), [editingId]);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.className.trim()) {
      return;
    }

    const payload = {
      name: form.name.trim(),
      className: form.className.trim(),
      section: form.section.trim(),
    };

    if (editingId) {
      onUpdateStudent(editingId, payload);
      setEditingId(null);
    } else {
      onAddStudent(payload);
    }

    setForm(emptyForm);
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setForm({
      name: student.name,
      className: student.className,
      section: student.section || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <section className="card panel-card">
      <div className="panel-head">
        <h2>Student Management</h2>
        <p className="panel-subtitle">Add, edit, and remove student records.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-grid compact">
        <input
          name="name"
          placeholder="Student name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="className"
          placeholder="Class (e.g. 10)"
          value={form.className}
          onChange={handleChange}
          required
        />
        <input
          name="section"
          placeholder="Section (optional)"
          value={form.section}
          onChange={handleChange}
        />

        <div className="action-row">
          <button type="submit" disabled={loading}>
            {submitLabel}
          </button>
          {editingId && (
            <button type="button" className="ghost" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr className="empty-row">
                <td colSpan="4">No students added yet. Use the form above to create one.</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id}>
                  <td>
                    <div className="student-identity">
                      <span className="student-avatar">{student.name?.charAt(0)?.toUpperCase() || "S"}</span>
                      <div>
                        <strong>{student.name}</strong>
                        <small>Roll profile</small>
                      </div>
                    </div>
                  </td>
                  <td>{student.className}</td>
                  <td>{student.section || "-"}</td>
                  <td>
                    <div className="action-row">
                      <button type="button" className="ghost" onClick={() => startEdit(student)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="danger"
                        onClick={() => onDeleteStudent(student._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StudentPanel;
