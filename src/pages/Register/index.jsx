import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";
import { buttonMotion } from "../../utils/animations.js";

export default function Register() {
  const { register } = useAuth();
  const [createdAccount, setCreatedAccount] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await register(form);
    setCreatedAccount(response.user);
    setForm({
      name: "",
      email: "",
      password: ""
    });
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
          Registration is mocked for portfolio purposes. The account is saved locally so
          you can sign in with the email and password you created.
        </p>
      </motion.section>

      {createdAccount ? (
        <motion.section
          className="auth-card success-auth-card"
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.48, delay: 0.1 }}
        >
          <div className="success-icon">
            <CheckCircle2 size={34} />
          </div>

          <span>Account created</span>
          <h2>Your login has been created successfully.</h2>
          <p>
            You can now return to the login page and access the simulator using
            your new email and password.
          </p>

          <Link className="primary-button" to="/login">
            Back to login
          </Link>
        </motion.section>
      ) : (
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

          <motion.button className="primary-button" {...buttonMotion}>
            Create demo account
          </motion.button>

          <p>
            Already have access? <Link to="/login">Sign in</Link>
          </p>
        </motion.form>
      )}
    </main>
  );
}
