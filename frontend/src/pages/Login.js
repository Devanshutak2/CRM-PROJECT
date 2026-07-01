import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.error || "Could not sign in. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-paper font-body px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-redline flex items-center justify-center font-display font-bold text-lg bg-charcoal text-white mb-3">
            SM
          </div>
          <p className="font-display text-lg font-semibold tracking-wide text-ink">
            SANGAM MOTORS
          </p>
          <p className="text-[11px] text-mute uppercase tracking-widest">
            Dealership CRM
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-line rounded-xl p-6 shadow-sm flex flex-col gap-4"
        >
          <div>
            <label className="block text-xs font-medium text-mute mb-1">Email</label>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@sangammotors.in"
              className="w-full border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-redline/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-mute mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-redline/40"
            />
          </div>

          {error && (
            <p className="text-xs text-redline bg-redline/10 border border-redline/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 bg-charcoal text-white rounded-lg py-2.5 text-sm font-medium hover:bg-ink transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-[11px] text-mute mt-6">
          Access is limited to Sangam Motors staff. Contact the owner if you need an
          account.
        </p>
      </div>
    </div>
  );
}
