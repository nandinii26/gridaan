const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const request = async (endpoint, options = {}) => {
  const { headers, ...restOptions } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const api = {
  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getStudents: (token) =>
    request("/students", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  addStudent: (token, payload) =>
    request("/students", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    }),

  updateStudent: (token, id, payload) =>
    request(`/students/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    }),

  deleteStudent: (token, id) =>
    request(`/students/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  getTasks: (token) =>
    request("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  addTask: (token, payload) =>
    request("/tasks", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    }),

  updateTaskStatus: (token, id, isCompleted) =>
    request(`/tasks/${id}/status`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ isCompleted }),
    }),
};
