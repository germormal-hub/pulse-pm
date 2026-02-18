import { useState } from "react";

// ─── DESIGN TOKENS (mirrors App.jsx) ───
const theme = {
  bg: {
    primary: "#0B0E14",
    secondary: "#111520",
    tertiary: "#161B28",
    card: "#1A1F2E",
    elevated: "#222840",
    input: "#151A27",
  },
  accent: {
    primary: "#6C5CE7",
    primaryHover: "#7D6FF0",
    secondary: "#00D2FF",
    success: "#00E676",
    danger: "#FF5252",
    warning: "#FFB300",
  },
  text: {
    primary: "#E8ECF4",
    secondary: "#8B95A8",
    muted: "#5A6478",
  },
  border: {
    subtle: "rgba(255,255,255,0.06)",
    medium: "rgba(255,255,255,0.1)",
    strong: "rgba(255,255,255,0.15)",
  },
};

// ─── DEMO CREDENTIALS ───
export const DEMO_USERS = [
  {
    id: "admin",
    name: "Admin User",
    email: "admin@pulse.pm",
    password: "admin123",
    role: "admin",
    avatar: "AU",
    color: "#6C5CE7",
    title: "System Administrator",
  },
  {
    id: "u1",
    name: "Gerardo M.",
    email: "gerardo@pulse.pm",
    password: "user123",
    role: "user",
    avatar: "GM",
    color: "#6C5CE7",
    title: "Ops Manager",
  },
  {
    id: "u2",
    name: "Ana López",
    email: "ana@pulse.pm",
    password: "user123",
    role: "user",
    avatar: "AL",
    color: "#00D2FF",
    title: "Product Designer",
  },
];

// ─── EYE ICON ───
const EyeIcon = ({ open }) =>
  open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

export default function SignIn({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (user) {
        const { password: _pw, ...safeUser } = user;
        onSignIn(safeUser);
      } else {
        setError("Incorrect email or password. Use a demo account below.");
        setLoading(false);
      }
    }, 700);
  };

  const fillDemo = (user) => {
    setEmail(user.email);
    setPassword(user.password);
    setError("");
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: theme.bg.input,
    border: `1px solid ${focusedField === field ? theme.accent.primary + "77" : theme.border.medium}`,
    borderRadius: 12,
    padding: "12px 16px",
    color: theme.text.primary,
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
    boxShadow: focusedField === field ? `0 0 0 3px ${theme.accent.primary}18` : "none",
  });

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        background: theme.bg.primary,
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        color: theme.text.primary,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: ${theme.text.muted}; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      `}</style>

      {/* Background orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "15%",
        width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.accent.primary}12, transparent 70%)`,
        animation: "pulseGlow 6s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "10%",
        width: 300, height: 300, borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.accent.secondary}10, transparent 70%)`,
        animation: "pulseGlow 8s ease-in-out infinite 2s",
        pointerEvents: "none",
      }} />

      {/* Left branding panel */}
      <div style={{
        flex: "0 0 480px",
        background: theme.bg.secondary,
        borderRight: `1px solid ${theme.border.subtle}`,
        display: "flex",
        flexDirection: "column",
        padding: "60px 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${theme.border.subtle} 1px, transparent 1px), linear-gradient(90deg, ${theme.border.subtle} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
          background: `linear-gradient(to top, ${theme.bg.secondary}, transparent)`,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 60 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 13, display: "flex",
              alignItems: "center", justifyContent: "center",
              background: `linear-gradient(135deg, ${theme.accent.primary}, ${theme.accent.secondary})`,
              fontSize: 22, fontWeight: 900, color: "#fff",
              boxShadow: `0 8px 24px ${theme.accent.primary}44`,
            }}>P</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: theme.text.primary, letterSpacing: "-0.02em" }}>Pulse PM</div>
              <div style={{ fontSize: 11, color: theme.text.muted, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>Project Hub</div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{
              fontSize: 38, fontWeight: 900, color: theme.text.primary,
              letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16,
            }}>
              Ship projects
              <br />
              <span style={{
                background: `linear-gradient(135deg, ${theme.accent.primary}, ${theme.accent.secondary})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                faster together
              </span>
            </h1>
            <p style={{ fontSize: 15, color: theme.text.secondary, lineHeight: 1.7, maxWidth: 340 }}>
              The all-in-one project management platform that keeps your team aligned, focused, and moving.
            </p>
          </div>

          {/* Feature bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: "⚡", text: "Real-time Kanban & timeline views" },
              { icon: "📊", text: "Automated reports & velocity tracking" },
              { icon: "👥", text: "Team workload balancing & insights" },
            ].map((f) => (
              <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: 16,
                  background: theme.bg.elevated, border: `1px solid ${theme.border.subtle}`,
                  flexShrink: 0,
                }}>{f.icon}</div>
                <span style={{ fontSize: 14, color: theme.text.secondary, fontWeight: 500 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div style={{
          marginTop: "auto", position: "relative", zIndex: 1,
          display: "flex", gap: 32, padding: "20px 0",
          borderTop: `1px solid ${theme.border.subtle}`,
        }}>
          {[
            { value: "2.4k+", label: "Teams" },
            { value: "98%", label: "Uptime" },
            { value: "50ms", label: "Avg latency" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 20, fontWeight: 800, color: theme.text.primary }}>{s.value}</div>
              <div style={{ fontSize: 11, color: theme.text.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: sign-in form */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: 40,
      }}>
        <div style={{
          width: "100%", maxWidth: 420,
          animation: "fadeIn 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: theme.text.primary, letterSpacing: "-0.02em", marginBottom: 8 }}>
              Welcome back
            </h2>
            <p style={{ fontSize: 14, color: theme.text.secondary }}>Sign in to your workspace</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Email */}
            <div>
              <label style={{
                display: "block", fontSize: 12, fontWeight: 600,
                color: theme.text.muted, marginBottom: 8,
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="you@company.com"
                style={inputStyle("email")}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{
                  fontSize: 12, fontWeight: 600, color: theme.text.muted,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}>Password</label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  style={{ ...inputStyle("password"), paddingRight: 44 }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: theme.text.muted, cursor: "pointer",
                    display: "flex", alignItems: "center", padding: 2,
                  }}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: `${theme.accent.danger}15`,
                border: `1px solid ${theme.accent.danger}44`,
                borderRadius: 10, padding: "10px 14px",
                color: theme.accent.danger, fontSize: 13, fontWeight: 500,
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px 0", borderRadius: 12, border: "none",
                background: loading
                  ? theme.bg.elevated
                  : `linear-gradient(135deg, ${theme.accent.primary}, ${theme.accent.primaryHover})`,
                color: loading ? theme.text.muted : "#fff",
                fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.01em", marginTop: 4,
                boxShadow: loading ? "none" : `0 4px 20px ${theme.accent.primary}44`,
                transition: "all 0.2s",
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0 20px" }}>
            <div style={{ flex: 1, height: 1, background: theme.border.subtle }} />
            <span style={{ fontSize: 12, color: theme.text.muted, fontWeight: 500 }}>Demo accounts</span>
            <div style={{ flex: 1, height: 1, background: theme.border.subtle }} />
          </div>

          {/* Demo credentials */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {DEMO_USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => fillDemo(u)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", borderRadius: 12, cursor: "pointer",
                  background: theme.bg.card,
                  border: `1px solid ${theme.border.subtle}`,
                  transition: "all 0.2s", textAlign: "left",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.accent.primary + "44";
                  e.currentTarget.style.background = theme.bg.elevated;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border.subtle;
                  e.currentTarget.style.background = theme.bg.card;
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: 12,
                  fontWeight: 700, color: "#fff", flexShrink: 0,
                  background: `linear-gradient(135deg, ${u.color}, ${u.color}99)`,
                }}>
                  {u.avatar}
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: theme.text.primary }}>{u.name}</span>
                    <span style={{
                      padding: "2px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.05em",
                      background: u.role === "admin" ? `${theme.accent.primary}20` : `${theme.accent.secondary}15`,
                      color: u.role === "admin" ? theme.accent.primary : theme.accent.secondary,
                      border: `1px solid ${u.role === "admin" ? theme.accent.primary + "40" : theme.accent.secondary + "30"}`,
                    }}>
                      {u.role}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: theme.text.muted, marginTop: 2 }}>{u.email}</div>
                </div>
                <div style={{ fontSize: 11, color: theme.text.muted, fontFamily: "monospace" }}>
                  {u.password}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
