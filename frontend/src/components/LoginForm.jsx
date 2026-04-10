import { useState } from "react";

const LoginForm = ({ onLogin, loading, error }) => {
  const [email, setEmail] = useState("admin@school.com");
  const [password, setPassword] = useState("admin123");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="card auth-card">
      <h1 className="auth-title">School Admin Login</h1>
      <p className="auth-subtitle">Sign in to manage students and assignments.</p>

      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
