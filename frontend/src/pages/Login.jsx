import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../services/supabaseClient";
import "./Login.css";

/**
 * Login page. Uses Supabase Auth for real sign-in.
 * If Supabase env vars aren't configured yet, the form is disabled and a
 * notice is shown instead of crashing — useful while the backend/auth
 * project is still being set up.
 */
export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isSupabaseConfigured) {
      setError("Authentication isn't configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to continue.");
      return;
    }

    setLoading(true);
    try {
      const action =
        mode === "login"
          ? supabase.auth.signInWithPassword({ email, password })
          : supabase.auth.signUp({ email, password });

      const { data, error: authError } = await action;
      if (authError) throw authError;

      onLogin(data.user);
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page login-page">
      <div className="login-card">
        <span className="eyebrow">ToiletTrust</span>
        <h1 className="login-title">
          {mode === "login" ? "Log in" : "Create an account"}
        </h1>
        <p className="login-subtitle">
          {mode === "login"
            ? "Sign in to report and verify public toilets near you."
            : "Sign up to start reporting facility conditions."}
        </p>

        {!isSupabaseConfigured && (
          <div className="login-notice">
            Authentication isn't configured yet in this environment. The form
            below will show an error on submit until Supabase is set up.
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="login-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <button
          type="button"
          className="login-switch"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
          }}
        >
          {mode === "login"
            ? "Need an account? Sign up"
            : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}
