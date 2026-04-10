import { useEffect, useState } from "react";
import { api } from "./services/api";
import LoginForm from "./components/LoginForm";
import StudentPanel from "./components/StudentPanel";
import TaskPanel from "./components/TaskPanel";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const pendingTasks = tasks.length - completedTasks;

  const isLoggedIn = Boolean(token);

  const loadDashboardData = async (authToken) => {
    const [studentsData, tasksData] = await Promise.all([
      api.getStudents(authToken),
      api.getTasks(authToken),
    ]);

    setStudents(studentsData);
    setTasks(tasksData);
  };

  useEffect(() => {
    if (!token) {
      setStudents([]);
      setTasks([]);
      return;
    }

    loadDashboardData(token).catch((err) => {
      setError(err.message);
      logout();
    });
  }, [token]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError("");
      const result = await api.login(credentials);

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      setToken(result.token);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  const addStudent = async (payload) => {
    try {
      const created = await api.addStudent(token, payload);
      setStudents((prev) => [created, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateStudent = async (id, payload) => {
    try {
      const updated = await api.updateStudent(token, id, payload);
      setStudents((prev) => prev.map((student) => (student._id === id ? updated : student)));
      setTasks((prev) =>
        prev.map((task) =>
          task.student?._id === id ? { ...task, student: { ...task.student, ...updated } } : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await api.deleteStudent(token, id);
      setStudents((prev) => prev.filter((student) => student._id !== id));
      setTasks((prev) => prev.filter((task) => task.student?._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const addTask = async (payload) => {
    try {
      const created = await api.addTask(token, payload);
      setTasks((prev) => [created, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTask = async (id, isCompleted) => {
    try {
      const updated = await api.updateTaskStatus(token, id, isCompleted);
      setTasks((prev) => prev.map((task) => (task._id === id ? updated : task)));
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="page auth-page">
        <LoginForm onLogin={login} loading={loading} error={error} />
      </main>
    );
  }

  return (
    <main className="page">
      <header className="card dashboard-header">
        <div className="header-copy">
          <h1>School Management Dashboard</h1>
          <p className="subtitle">Welcome, {user?.email}</p>
        </div>

        <button type="button" className="ghost" onClick={logout}>
          Logout
        </button>
      </header>

      {error && <p className="error-text card">{error}</p>}

      <section className="stats-grid">
        <article className="card stat-card">
          <p>Total Students</p>
          <strong>{students.length}</strong>
        </article>
        <article className="card stat-card">
          <p>Total Tasks</p>
          <strong>{tasks.length}</strong>
        </article>
        <article className="card stat-card">
          <p>Completed Tasks</p>
          <strong>{completedTasks}</strong>
        </article>
        <article className="card stat-card">
          <p>Pending Tasks</p>
          <strong>{pendingTasks}</strong>
        </article>
      </section>

      <section className="grid-two">
        <StudentPanel
          students={students}
          onAddStudent={addStudent}
          onUpdateStudent={updateStudent}
          onDeleteStudent={deleteStudent}
          loading={loading}
        />

        <TaskPanel
          tasks={tasks}
          students={students}
          onAddTask={addTask}
          onToggleTask={toggleTask}
        />
      </section>
    </main>
  );
};

export default App;
