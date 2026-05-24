import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import { buttonMotion } from "../utils/animations.js";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  async function handleSubmit(event) {
    event.preventDefault();
    await register(form);
    navigate("/dashboard");
  }

  return (
    <main className="auth-page">
      <div className="background-fx" aria-hidden="true">
        <span className="orb orb-one" />
        <span className="orb orb-two" />
        <span className="grid-glow" />
      </div>

      <motion.section
        className="auth-hero"
        initial={{ opacity: 0, x: -22 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55 }}
      >
        <span>Start demo mode</span>
        <h1>Create a simulated trading workspace in seconds.</h1>
        <p>
          Registration is mocked for portfolio purposes and stores the demo session locally.
        </p>
      </motion.section>

      <motion.form
        className="auth-card"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.48, delay: 0.1 }}
      >
        <span>Create account</span>
        <h2>Register demo user</h2>

        <label>
          Full name
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </label>

        <label>
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>

        <label>
          Password
          <input
            required
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
        </label>

        <motion.button className="primary-button" {...buttonMotion}>Create demo account</motion.button>

        <p>
          Already have access? <Link to="/login">Sign in</Link>
        </p>
      </motion.form>
    </main>
  );
}
