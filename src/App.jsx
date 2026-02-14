import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─── ICON COMPONENTS ───
const Icons = {
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  Board: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
    </svg>
  ),
  Timeline: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><polyline points="8 6 3 12 8 18"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/>
    </svg>
  ),
  Reports: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  MoreH: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  ArrowUp: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
    </svg>
  ),
  ArrowDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
    </svg>
  ),
  Filter: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Zap: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Target: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Folder: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Drag: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
      <circle cx="8" cy="4" r="2"/><circle cx="16" cy="4" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="20" r="2"/><circle cx="16" cy="20" r="2"/>
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

// ─── DESIGN TOKENS ───
const theme = {
  bg: {
    primary: "#0B0E14",
    secondary: "#111520",
    tertiary: "#161B28",
    card: "#1A1F2E",
    cardHover: "#1E2438",
    elevated: "#222840",
    input: "#151A27",
  },
  accent: {
    primary: "#6C5CE7",
    primaryHover: "#7D6FF0",
    secondary: "#00D2FF",
    success: "#00E676",
    warning: "#FFB300",
    danger: "#FF5252",
    info: "#448AFF",
  },
  text: {
    primary: "#E8ECF4",
    secondary: "#8B95A8",
    muted: "#5A6478",
    inverse: "#0B0E14",
  },
  border: {
    subtle: "rgba(255,255,255,0.06)",
    medium: "rgba(255,255,255,0.1)",
    strong: "rgba(255,255,255,0.15)",
  },
  status: {
    done: { bg: "rgba(0,230,118,0.12)", text: "#00E676", border: "rgba(0,230,118,0.25)" },
    inProgress: { bg: "rgba(0,210,255,0.12)", text: "#00D2FF", border: "rgba(0,210,255,0.25)" },
    review: { bg: "rgba(255,179,0,0.12)", text: "#FFB300", border: "rgba(255,179,0,0.25)" },
    todo: { bg: "rgba(139,149,168,0.1)", text: "#8B95A8", border: "rgba(139,149,168,0.2)" },
    blocked: { bg: "rgba(255,82,82,0.12)", text: "#FF5252", border: "rgba(255,82,82,0.25)" },
  },
  priority: {
    critical: "#FF5252",
    high: "#FFB300",
    medium: "#00D2FF",
    low: "#8B95A8",
  },
};

// ─── SAMPLE DATA ───
const initialProjects = [
  { id: "p1", name: "Website Redesign", color: "#6C5CE7", icon: "🌐" },
  { id: "p2", name: "Mobile App v2.0", color: "#00D2FF", icon: "📱" },
  { id: "p3", name: "Q1 Marketing", color: "#00E676", icon: "📊" },
  { id: "p4", name: "API Integration", color: "#FFB300", icon: "⚡" },
];

const teamMembers = [
  { id: "u1", name: "Gerardo M.", avatar: "GM", color: "#6C5CE7" },
  { id: "u2", name: "Ana López", avatar: "AL", color: "#00D2FF" },
  { id: "u3", name: "Carlos R.", avatar: "CR", color: "#00E676" },
  { id: "u4", name: "Sofia T.", avatar: "ST", color: "#FFB300" },
  { id: "u5", name: "Diego V.", avatar: "DV", color: "#FF5252" },
  { id: "u6", name: "María K.", avatar: "MK", color: "#448AFF" },
];

const generateTasks = () => {
  const statuses = ["done", "inProgress", "review", "todo", "blocked"];
  const priorities = ["critical", "high", "medium", "low"];
  const taskNames = [
    "Design system components", "User auth flow", "Dashboard wireframes", "API endpoint docs",
    "Database migration", "Payment integration", "Email templates", "Performance audit",
    "SEO optimization", "Security review", "Mobile responsive", "Analytics setup",
    "CI/CD pipeline", "Load testing", "User onboarding", "Notification system",
    "Search functionality", "Dark mode support", "Export reports", "Billing module",
    "Landing page copy", "Social media assets", "A/B test setup", "Customer interviews",
  ];
  return taskNames.map((name, i) => ({
    id: `t${i + 1}`,
    name,
    status: statuses[i % 5],
    priority: priorities[i % 4],
    assignee: teamMembers[i % 6],
    project: initialProjects[i % 4],
    dueDate: new Date(2026, 1, 10 + (i * 2) % 28).toISOString().split("T")[0],
    progress: Math.min(100, Math.max(0, [100, 65, 40, 0, 20][i % 5] + Math.floor(Math.random() * 20))),
    created: new Date(2026, 0, 15 + i).toISOString().split("T")[0],
    timeSpent: Math.floor(Math.random() * 40) + 2,
    timeEstimate: Math.floor(Math.random() * 50) + 10,
  }));
};

// ─── MINI CHART COMPONENTS ───
const SparkBar = ({ data, color, height = 40 }) => {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, borderRadius: 2,
          height: `${(v / max) * 100}%`,
          background: `linear-gradient(180deg, ${color}, ${color}44)`,
          minHeight: 2,
          transition: "height 0.6s cubic-bezier(0.16,1,0.3,1)",
        }} />
      ))}
    </div>
  );
};

const DonutChart = ({ segments, size = 100, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((a, b) => a + b.value, 0);
  let offset = 0;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={theme.bg.secondary} strokeWidth={strokeWidth} />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * circumference;
        const el = (
          <circle key={i} cx={size/2} cy={size/2} r={radius} fill="none" stroke={seg.color}
            strokeWidth={strokeWidth} strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset} strokeLinecap="round"
            style={{ transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
};

const MiniLineChart = ({ data, color, height = 50, width = 160 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 8) - 4}`).join(" ");
  const areaPoints = `0,${height} ${points} ${width},${height}`;
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace('#','')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {data.length > 0 && (() => {
        const lastX = width;
        const lastY = height - ((data[data.length-1] - min) / range) * (height - 8) - 4;
        return <circle cx={lastX} cy={lastY} r="3" fill={color} />;
      })()}
    </svg>
  );
};

const ProgressRing = ({ progress, size = 36, strokeWidth = 3, color }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (progress / 100) * circumference;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={theme.border.subtle} strokeWidth={strokeWidth} />
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color || theme.accent.primary}
        strokeWidth={strokeWidth} strokeDasharray={`${dash} ${circumference - dash}`} strokeLinecap="round"
        style={{ transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
    </svg>
  );
};

// ─── REUSABLE UI COMPONENTS ───
const Avatar = ({ member, size = 28 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", display: "flex",
    alignItems: "center", justifyContent: "center", fontSize: size * 0.38,
    fontWeight: 700, color: "#fff", letterSpacing: "0.02em",
    background: `linear-gradient(135deg, ${member.color}, ${member.color}99)`,
    border: `2px solid ${theme.bg.primary}`, flexShrink: 0,
  }}>
    {member.avatar}
  </div>
);

const Badge = ({ children, variant = "default", style: extraStyle = {} }) => {
  const variants = {
    default: { bg: theme.bg.elevated, color: theme.text.secondary, border: theme.border.subtle },
    success: { bg: theme.status.done.bg, color: theme.status.done.text, border: theme.status.done.border },
    warning: { bg: theme.status.review.bg, color: theme.status.review.text, border: theme.status.review.border },
    danger: { bg: theme.status.blocked.bg, color: theme.status.blocked.text, border: theme.status.blocked.border },
    info: { bg: theme.status.inProgress.bg, color: theme.status.inProgress.text, border: theme.status.inProgress.border },
  };
  const v = variants[variant] || variants.default;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px",
      borderRadius: 6, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em",
      background: v.bg, color: v.color, border: `1px solid ${v.border}`,
      textTransform: "uppercase", ...extraStyle,
    }}>
      {children}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    done: { label: "Done", variant: "success" },
    inProgress: { label: "In Progress", variant: "info" },
    review: { label: "Review", variant: "warning" },
    todo: { label: "To Do", variant: "default" },
    blocked: { label: "Blocked", variant: "danger" },
  };
  const s = map[status] || map.todo;
  return <Badge variant={s.variant}>{s.label}</Badge>;
};

const PriorityIndicator = ({ priority }) => {
  const color = theme.priority[priority] || theme.priority.medium;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}66` }} />
      <span style={{ fontSize: 12, color: theme.text.secondary, textTransform: "capitalize" }}>{priority}</span>
    </div>
  );
};

// ─── STAT CARD ───
const StatCard = ({ icon, label, value, change, changeDir, sparkData, sparkColor, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), delay); }, [delay]);
  return (
    <div style={{
      background: theme.bg.card, borderRadius: 16, padding: "20px 22px",
      border: `1px solid ${theme.border.subtle}`, flex: "1 1 200px", minWidth: 200,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0, width: 120, height: 80,
        background: `radial-gradient(ellipse at top right, ${sparkColor || theme.accent.primary}08, transparent)`,
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{ color: theme.text.muted, fontSize: 12, fontWeight: 500, marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: theme.text.primary, letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: `linear-gradient(135deg, ${sparkColor || theme.accent.primary}18, ${sparkColor || theme.accent.primary}08)`,
          display: "flex", alignItems: "center", justifyContent: "center", color: sparkColor || theme.accent.primary,
        }}>
          {icon}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {change && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600,
            color: changeDir === "up" ? theme.accent.success : changeDir === "down" ? theme.accent.danger : theme.text.muted }}>
            {changeDir === "up" ? <Icons.ArrowUp /> : changeDir === "down" ? <Icons.ArrowDown /> : null}
            {change}
          </div>
        )}
        {sparkData && (
          <div style={{ flex: 1, maxWidth: 90, marginLeft: 12 }}>
            <SparkBar data={sparkData} color={sparkColor || theme.accent.primary} height={28} />
          </div>
        )}
      </div>
    </div>
  );
};

// ─── ADD TASK MODAL ───
const AddTaskModal = ({ onClose, onAdd, projects }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [assigneeId, setAssigneeId] = useState(teamMembers[0]?.id || "");
  const selectStyle = {
    background: theme.bg.input, border: `1px solid ${theme.border.medium}`, borderRadius: 10,
    padding: "10px 14px", color: theme.text.primary, fontSize: 13, width: "100%", outline: "none",
    appearance: "none", cursor: "pointer",
  };
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.2s ease",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: theme.bg.card, borderRadius: 20, padding: 32, width: 440,
        border: `1px solid ${theme.border.medium}`,
        boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: theme.text.primary }}>New Task</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: theme.text.muted, cursor: "pointer", padding: 4 }}><Icons.X /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: theme.text.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Task Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="What needs to be done?"
              style={{ ...selectStyle, background: theme.bg.input }} autoFocus />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: theme.text.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
                <option value="todo">To Do</option><option value="inProgress">In Progress</option>
                <option value="review">Review</option><option value="done">Done</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: theme.text.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={selectStyle}>
                <option value="critical">Critical</option><option value="high">High</option>
                <option value="medium">Medium</option><option value="low">Low</option>
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: theme.text.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Project</label>
              <select value={projectId} onChange={e => setProjectId(e.target.value)} style={selectStyle}>
                {projects.map(p => <option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: theme.text.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Assignee</label>
              <select value={assigneeId} onChange={e => setAssigneeId(e.target.value)} style={selectStyle}>
                {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => {
            if (!name.trim()) return;
            onAdd({ name: name.trim(), status, priority, projectId, assigneeId });
            onClose();
          }} style={{
            background: `linear-gradient(135deg, ${theme.accent.primary}, ${theme.accent.primaryHover})`,
            color: "#fff", border: "none", borderRadius: 12, padding: "12px 0",
            fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 4,
            boxShadow: `0 4px 20px ${theme.accent.primary}44`,
            transition: "all 0.2s", letterSpacing: "0.02em",
          }}>
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ───
export default function ProjectManagementApp() {
  const [activeView, setActiveView] = useState("dashboard");
  const [tasks, setTasks] = useState(generateTasks);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProject, setFilterProject] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filterStatus !== "all" && t.status !== filterStatus) return false;
      if (filterProject !== "all" && t.project.id !== filterProject) return false;
      if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [tasks, filterStatus, filterProject, searchQuery]);

  const stats = useMemo(() => {
    const done = tasks.filter(t => t.status === "done").length;
    const inProgress = tasks.filter(t => t.status === "inProgress").length;
    const blocked = tasks.filter(t => t.status === "blocked").length;
    const overdue = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "done").length;
    const totalHours = tasks.reduce((a, t) => a + t.timeSpent, 0);
    const avgProgress = Math.round(tasks.reduce((a, t) => a + t.progress, 0) / tasks.length);
    return { done, inProgress, blocked, overdue, totalHours, avgProgress, total: tasks.length };
  }, [tasks]);

  const addTask = ({ name, status, priority, projectId, assigneeId }) => {
    const project = initialProjects.find(p => p.id === projectId);
    const assignee = teamMembers.find(m => m.id === assigneeId);
    setTasks(prev => [...prev, {
      id: `t${Date.now()}`, name, status, priority, assignee, project,
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      progress: status === "done" ? 100 : 0, created: new Date().toISOString().split("T")[0],
      timeSpent: 0, timeEstimate: 20,
    }]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? {
      ...t, status: newStatus, progress: newStatus === "done" ? 100 : t.progress
    } : t));
  };

  // ─── SIDEBAR ───
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Icons.Dashboard /> },
    { id: "board", label: "Board", icon: <Icons.Board /> },
    { id: "timeline", label: "Timeline", icon: <Icons.Timeline /> },
    { id: "reports", label: "Reports", icon: <Icons.Reports /> },
    { id: "team", label: "Team", icon: <Icons.Users /> },
  ];

  const Sidebar = () => (
    <div style={{
      width: sidebarCollapsed ? 64 : 240, height: "100%", background: theme.bg.secondary,
      borderRight: `1px solid ${theme.border.subtle}`, display: "flex", flexDirection: "column",
      transition: "width 0.3s cubic-bezier(0.16,1,0.3,1)", flexShrink: 0, overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{
        padding: sidebarCollapsed ? "20px 12px" : "20px 20px", display: "flex", alignItems: "center",
        gap: 12, borderBottom: `1px solid ${theme.border.subtle}`, minHeight: 64, cursor: "pointer",
      }} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(135deg, ${theme.accent.primary}, ${theme.accent.secondary})`,
          fontSize: 16, fontWeight: 900, color: "#fff", flexShrink: 0,
        }}>P</div>
        {!sidebarCollapsed && (
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: theme.text.primary, letterSpacing: "-0.02em" }}>Pulse PM</div>
            <div style={{ fontSize: 10, color: theme.text.muted, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>Project Hub</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ padding: "12px 8px", flex: 1 }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveView(item.id)} style={{
            display: "flex", alignItems: "center", gap: 12, width: "100%",
            padding: sidebarCollapsed ? "10px 0" : "10px 14px", borderRadius: 10,
            background: activeView === item.id ? `${theme.accent.primary}15` : "transparent",
            color: activeView === item.id ? theme.accent.primary : theme.text.secondary,
            border: activeView === item.id ? `1px solid ${theme.accent.primary}25` : "1px solid transparent",
            cursor: "pointer", fontSize: 13, fontWeight: activeView === item.id ? 600 : 500,
            transition: "all 0.2s", marginBottom: 2,
            justifyContent: sidebarCollapsed ? "center" : "flex-start",
          }}>
            {item.icon}
            {!sidebarCollapsed && item.label}
          </button>
        ))}

        {!sidebarCollapsed && (
          <>
            <div style={{ margin: "16px 14px 8px", fontSize: 10, fontWeight: 600, color: theme.text.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Projects
            </div>
            {initialProjects.map(p => (
              <button key={p.id} onClick={() => { setFilterProject(p.id); setActiveView("board"); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 14px",
                  borderRadius: 8, background: filterProject === p.id ? `${p.color}12` : "transparent",
                  border: "none", cursor: "pointer", fontSize: 13, color: theme.text.secondary,
                  transition: "all 0.2s",
                }}>
                <span style={{ fontSize: 14 }}>{p.icon}</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
              </button>
            ))}
          </>
        )}
      </div>

      {/* User */}
      {!sidebarCollapsed && (
        <div style={{ padding: "12px 14px", borderTop: `1px solid ${theme.border.subtle}`, display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar member={teamMembers[0]} size={32} />
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.text.primary }}>Gerardo M.</div>
            <div style={{ fontSize: 11, color: theme.text.muted }}>Ops Manager</div>
          </div>
        </div>
      )}
    </div>
  );

  // ─── TOP BAR ───
  const TopBar = () => (
    <div style={{
      height: 56, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: `1px solid ${theme.border.subtle}`, background: theme.bg.primary, flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: theme.text.primary, letterSpacing: "-0.01em" }}>
          {navItems.find(n => n.id === activeView)?.label || "Dashboard"}
        </h2>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, background: theme.bg.input,
          borderRadius: 10, padding: "7px 14px", border: `1px solid ${theme.border.subtle}`, width: 240,
        }}>
          <Icons.Search />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search tasks..." style={{
              background: "none", border: "none", outline: "none", color: theme.text.primary,
              fontSize: 13, width: "100%",
            }} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{
          background: theme.bg.input, border: `1px solid ${theme.border.subtle}`, borderRadius: 8,
          padding: "6px 10px", color: theme.text.secondary, fontSize: 12, outline: "none", cursor: "pointer",
        }}>
          <option value="all">All Status</option>
          <option value="todo">To Do</option><option value="inProgress">In Progress</option>
          <option value="review">Review</option><option value="done">Done</option><option value="blocked">Blocked</option>
        </select>
        <button style={{
          position: "relative", background: "none", border: "none", color: theme.text.muted, cursor: "pointer", padding: 6,
        }}>
          <Icons.Bell />
          <div style={{
            position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%",
            background: theme.accent.danger, border: `2px solid ${theme.bg.primary}`,
          }} />
        </button>
        <button onClick={() => setShowAddTask(true)} style={{
          display: "flex", alignItems: "center", gap: 6,
          background: `linear-gradient(135deg, ${theme.accent.primary}, ${theme.accent.primaryHover})`,
          color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px",
          fontSize: 13, fontWeight: 600, cursor: "pointer",
          boxShadow: `0 2px 12px ${theme.accent.primary}44`, transition: "all 0.2s",
        }}>
          <Icons.Plus /> New Task
        </button>
      </div>
    </div>
  );

  // ─── DASHBOARD VIEW ───
  const DashboardView = () => {
    const weeklyData = [12, 8, 15, 10, 18, 14, 20];
    const velocityData = [4, 7, 5, 9, 6, 11, 8, 13, 10, 14, 12, 16];
    const burndownData = [24, 22, 20, 18, 19, 16, 14, 12, 10, 8, 6, 3];

    const statusCounts = {
      done: tasks.filter(t => t.status === "done").length,
      inProgress: tasks.filter(t => t.status === "inProgress").length,
      review: tasks.filter(t => t.status === "review").length,
      todo: tasks.filter(t => t.status === "todo").length,
      blocked: tasks.filter(t => t.status === "blocked").length,
    };

    const projectHealth = initialProjects.map(p => {
      const projectTasks = tasks.filter(t => t.project.id === p.id);
      const done = projectTasks.filter(t => t.status === "done").length;
      return { ...p, total: projectTasks.length, done, pct: projectTasks.length ? Math.round((done / projectTasks.length) * 100) : 0 };
    });

    return (
      <div style={{ padding: 24, overflowY: "auto", flex: 1 }}>
        {/* Stats Row */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          <StatCard icon={<Icons.Target />} label="Total Tasks" value={stats.total} change="+12% this week" changeDir="up"
            sparkData={weeklyData} sparkColor={theme.accent.primary} delay={0} />
          <StatCard icon={<Icons.Check />} label="Completed" value={stats.done} change={`${Math.round(stats.done/stats.total*100)}% rate`} changeDir="up"
            sparkData={[3,5,4,7,6,8,9]} sparkColor={theme.accent.success} delay={80} />
          <StatCard icon={<Icons.Zap />} label="In Progress" value={stats.inProgress} change="On track" changeDir="up"
            sparkData={[2,4,3,5,4,5,6]} sparkColor={theme.accent.secondary} delay={160} />
          <StatCard icon={<Icons.Clock />} label="Hours Logged" value={`${stats.totalHours}h`} change="+8h today" changeDir="up"
            sparkData={[6,8,5,9,7,10,8]} sparkColor={theme.accent.warning} delay={240} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
          {/* Status Distribution */}
          <div style={{
            background: theme.bg.card, borderRadius: 16, padding: 24,
            border: `1px solid ${theme.border.subtle}`,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.text.primary, marginBottom: 20 }}>Status Distribution</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <div style={{ position: "relative" }}>
                <DonutChart size={130} strokeWidth={14} segments={[
                  { value: statusCounts.done, color: theme.accent.success },
                  { value: statusCounts.inProgress, color: theme.accent.secondary },
                  { value: statusCounts.review, color: theme.accent.warning },
                  { value: statusCounts.todo, color: theme.text.muted },
                  { value: statusCounts.blocked, color: theme.accent.danger },
                ]} />
                <div style={{
                  position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: theme.text.primary }}>{stats.avgProgress}%</div>
                  <div style={{ fontSize: 10, color: theme.text.muted, textTransform: "uppercase" }}>Avg Progress</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Done", count: statusCounts.done, color: theme.accent.success },
                { label: "In Progress", count: statusCounts.inProgress, color: theme.accent.secondary },
                { label: "Review", count: statusCounts.review, color: theme.accent.warning },
                { label: "To Do", count: statusCounts.todo, color: theme.text.muted },
                { label: "Blocked", count: statusCounts.blocked, color: theme.accent.danger },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 3, background: s.color }} />
                    <span style={{ fontSize: 12, color: theme.text.secondary }}>{s.label}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: theme.text.primary }}>{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Velocity Chart */}
          <div style={{
            background: theme.bg.card, borderRadius: 16, padding: 24,
            border: `1px solid ${theme.border.subtle}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.text.primary }}>Team Velocity</div>
              <Badge>Last 12 weeks</Badge>
            </div>
            <div style={{ marginBottom: 8 }}>
              <MiniLineChart data={velocityData} color={theme.accent.primary} height={100} width={280} />
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: theme.text.primary }}>12.3</div>
                <div style={{ fontSize: 11, color: theme.text.muted }}>Avg tasks/week</div>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: theme.accent.success }}>+18%</div>
                <div style={{ fontSize: 11, color: theme.text.muted }}>vs last quarter</div>
              </div>
            </div>
          </div>

          {/* Burndown */}
          <div style={{
            background: theme.bg.card, borderRadius: 16, padding: 24,
            border: `1px solid ${theme.border.subtle}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.text.primary }}>Sprint Burndown</div>
              <Badge variant="success">On Track</Badge>
            </div>
            <div style={{ marginBottom: 8 }}>
              <MiniLineChart data={burndownData} color={theme.accent.secondary} height={100} width={280} />
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: theme.text.primary }}>3</div>
                <div style={{ fontSize: 11, color: theme.text.muted }}>Tasks remaining</div>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: theme.accent.secondary }}>2 days</div>
                <div style={{ fontSize: 11, color: theme.text.muted }}>Until deadline</div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Health + Recent Activity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Project Health */}
          <div style={{
            background: theme.bg.card, borderRadius: 16, padding: 24,
            border: `1px solid ${theme.border.subtle}`,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.text.primary, marginBottom: 20 }}>Project Health</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {projectHealth.map(p => (
                <div key={p.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 16 }}>{p.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: theme.text.primary }}>{p.name}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: p.pct >= 60 ? theme.accent.success : p.pct >= 30 ? theme.accent.warning : theme.text.muted }}>
                      {p.pct}%
                    </span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: theme.bg.secondary, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 3, width: `${p.pct}%`,
                      background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`,
                      transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
                    }} />
                  </div>
                  <div style={{ fontSize: 11, color: theme.text.muted, marginTop: 4 }}>{p.done}/{p.total} tasks completed</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: theme.bg.card, borderRadius: 16, padding: 24,
            border: `1px solid ${theme.border.subtle}`,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.text.primary, marginBottom: 20 }}>Recent Activity</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { user: teamMembers[0], action: "completed", task: "Dashboard wireframes", time: "2m ago", color: theme.accent.success },
                { user: teamMembers[1], action: "moved to review", task: "API endpoint docs", time: "15m ago", color: theme.accent.warning },
                { user: teamMembers[2], action: "started", task: "Database migration", time: "1h ago", color: theme.accent.secondary },
                { user: teamMembers[3], action: "flagged blocked", task: "Payment integration", time: "2h ago", color: theme.accent.danger },
                { user: teamMembers[4], action: "created", task: "Load testing", time: "3h ago", color: theme.accent.info },
                { user: teamMembers[5], action: "completed", task: "Email templates", time: "4h ago", color: theme.accent.success },
              ].map((a, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                  borderBottom: i < 5 ? `1px solid ${theme.border.subtle}` : "none",
                }}>
                  <Avatar member={a.user} size={28} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: theme.text.secondary }}>
                      <span style={{ fontWeight: 600, color: theme.text.primary }}>{a.user.name}</span>
                      {" "}<span style={{ color: a.color }}>{a.action}</span>{" "}
                      <span style={{ fontWeight: 500 }}>{a.task}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: theme.text.muted, whiteSpace: "nowrap" }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── BOARD VIEW (Kanban) ───
  const BoardView = () => {
    const columns = [
      { id: "todo", label: "To Do", color: theme.text.muted },
      { id: "inProgress", label: "In Progress", color: theme.accent.secondary },
      { id: "review", label: "Review", color: theme.accent.warning },
      { id: "done", label: "Done", color: theme.accent.success },
      { id: "blocked", label: "Blocked", color: theme.accent.danger },
    ];
    return (
      <div style={{ padding: 24, overflowX: "auto", flex: 1, display: "flex", gap: 16 }}>
        {columns.map(col => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} style={{ minWidth: 280, maxWidth: 320, flex: "1 1 280px" }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 12, padding: "0 4px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: col.color }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: theme.text.primary }}>{col.label}</span>
                  <span style={{
                    background: theme.bg.elevated, borderRadius: 6, padding: "2px 8px",
                    fontSize: 11, fontWeight: 700, color: theme.text.muted,
                  }}>{colTasks.length}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {colTasks.map(task => (
                  <div key={task.id} onClick={() => setSelectedTask(task)} style={{
                    background: theme.bg.card, borderRadius: 12, padding: 16, cursor: "pointer",
                    border: `1px solid ${theme.border.subtle}`,
                    transition: "all 0.2s", position: "relative",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = col.color + "55"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border.subtle; e.currentTarget.style.transform = "none"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <PriorityIndicator priority={task.priority} />
                      <span style={{ fontSize: 10, color: theme.text.muted }}>{task.project.icon}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: theme.text.primary, marginBottom: 12, lineHeight: 1.4 }}>
                      {task.name}
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: theme.bg.secondary, marginBottom: 12, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: 2, width: `${task.progress}%`,
                        background: task.progress === 100 ? theme.accent.success : col.color,
                        transition: "width 0.6s ease",
                      }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Avatar member={task.assignee} size={24} />
                      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: theme.text.muted }}>
                        <Icons.Clock /> {task.dueDate.slice(5)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ─── TIMELINE VIEW ───
  const TimelineView = () => {
    const sorted = [...filteredTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    const earliest = sorted[0]?.dueDate;
    const latest = sorted[sorted.length - 1]?.dueDate;
    const daySpan = earliest && latest ? Math.max(1, Math.ceil((new Date(latest) - new Date(earliest)) / 86400000)) : 30;

    return (
      <div style={{ padding: 24, overflowY: "auto", flex: 1 }}>
        <div style={{
          background: theme.bg.card, borderRadius: 16, padding: 24,
          border: `1px solid ${theme.border.subtle}`,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: theme.text.primary, marginBottom: 20 }}>Project Timeline</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {sorted.slice(0, 16).map(task => {
              const offsetDays = earliest ? Math.ceil((new Date(task.dueDate) - new Date(earliest)) / 86400000) : 0;
              const leftPct = (offsetDays / daySpan) * 100;
              const widthPct = Math.max(5, (task.timeEstimate / daySpan) * 100);
              const statusColor = theme.status[task.status]?.text || theme.text.muted;
              return (
                <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 12, height: 36 }}>
                  <div style={{ width: 180, flexShrink: 0, display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
                    <Avatar member={task.assignee} size={22} />
                    <span style={{ fontSize: 12, color: theme.text.secondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {task.name}
                    </span>
                  </div>
                  <div style={{ flex: 1, position: "relative", height: 20, background: theme.bg.secondary, borderRadius: 4 }}>
                    <div style={{
                      position: "absolute", left: `${leftPct}%`, width: `${Math.min(widthPct, 100 - leftPct)}%`,
                      height: "100%", borderRadius: 4, overflow: "hidden",
                      background: `linear-gradient(90deg, ${statusColor}44, ${statusColor}22)`,
                      border: `1px solid ${statusColor}33`,
                    }}>
                      <div style={{
                        height: "100%", width: `${task.progress}%`, borderRadius: 4,
                        background: `linear-gradient(90deg, ${statusColor}, ${statusColor}88)`,
                      }} />
                    </div>
                  </div>
                  <span style={{ width: 60, fontSize: 11, color: theme.text.muted, textAlign: "right", flexShrink: 0 }}>
                    {task.dueDate.slice(5)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ─── REPORTS VIEW ───
  const ReportsView = () => {
    const byMember = teamMembers.map(m => {
      const memberTasks = tasks.filter(t => t.assignee.id === m.id);
      const done = memberTasks.filter(t => t.status === "done").length;
      const hours = memberTasks.reduce((a, t) => a + t.timeSpent, 0);
      return { ...m, total: memberTasks.length, done, hours, pct: memberTasks.length ? Math.round((done / memberTasks.length) * 100) : 0 };
    });

    const byPriority = ["critical", "high", "medium", "low"].map(p => ({
      label: p, count: tasks.filter(t => t.priority === p).length,
      done: tasks.filter(t => t.priority === p && t.status === "done").length,
      color: theme.priority[p],
    }));

    const weeklyCompletion = [8, 12, 6, 15, 10, 18, 14];
    const efficiencyData = [72, 78, 65, 82, 88, 75, 91, 85, 93, 87, 95, 90];

    return (
      <div style={{ padding: 24, overflowY: "auto", flex: 1 }}>
        {/* KPI Row */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          <StatCard icon={<Icons.TrendingUp />} label="Completion Rate" value={`${Math.round(stats.done/stats.total*100)}%`}
            change="+5% vs last sprint" changeDir="up" sparkData={[60,65,58,72,68,75,80]} sparkColor={theme.accent.success} delay={0} />
          <StatCard icon={<Icons.Clock />} label="Avg Cycle Time" value="3.2d"
            change="-0.8d improvement" changeDir="up" sparkData={[5,4.5,4.2,3.8,4,3.5,3.2]} sparkColor={theme.accent.secondary} delay={80} />
          <StatCard icon={<Icons.Zap />} label="Team Efficiency" value="91%"
            change="+4% this month" changeDir="up" sparkData={efficiencyData.slice(-7)} sparkColor={theme.accent.primary} delay={160} />
          <StatCard icon={<Icons.Target />} label="Sprint Goal" value="87%"
            change="13% remaining" changeDir="up" sparkData={[40,55,62,70,75,80,87]} sparkColor={theme.accent.warning} delay={240} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {/* Team Performance */}
          <div style={{
            background: theme.bg.card, borderRadius: 16, padding: 24,
            border: `1px solid ${theme.border.subtle}`,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.text.primary, marginBottom: 20 }}>Team Performance</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {byMember.sort((a, b) => b.pct - a.pct).map(m => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar member={m} size={30} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: theme.text.primary }}>{m.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: m.pct >= 70 ? theme.accent.success : m.pct >= 40 ? theme.accent.warning : theme.text.muted }}>
                        {m.pct}%
                      </span>
                    </div>
                    <div style={{ height: 5, borderRadius: 3, background: theme.bg.secondary, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: 3, width: `${m.pct}%`,
                        background: `linear-gradient(90deg, ${m.color}, ${m.color}77)`,
                        transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
                      }} />
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: theme.text.muted }}>{m.done}/{m.total} tasks</span>
                      <span style={{ fontSize: 11, color: theme.text.muted }}>{m.hours}h logged</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Breakdown */}
          <div style={{
            background: theme.bg.card, borderRadius: 16, padding: 24,
            border: `1px solid ${theme.border.subtle}`,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.text.primary, marginBottom: 20 }}>Priority Breakdown</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {byPriority.map(p => (
                <div key={p.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, boxShadow: `0 0 8px ${p.color}44` }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: theme.text.primary, textTransform: "capitalize" }}>{p.label}</span>
                    </div>
                    <span style={{ fontSize: 12, color: theme.text.muted }}>{p.done}/{p.count}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: theme.bg.secondary, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 4,
                      width: `${p.count > 0 ? (p.done / p.count) * 100 : 0}%`,
                      background: `linear-gradient(90deg, ${p.color}, ${p.color}66)`,
                      transition: "width 0.8s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, padding: 16, background: theme.bg.secondary, borderRadius: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: theme.text.primary, marginBottom: 8 }}>Weekly Completion Trend</div>
              <SparkBar data={weeklyCompletion} color={theme.accent.primary} height={50} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                  <span key={d} style={{ fontSize: 10, color: theme.text.muted }}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Efficiency + Time */}
        <div style={{
          background: theme.bg.card, borderRadius: 16, padding: 24,
          border: `1px solid ${theme.border.subtle}`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.text.primary }}>Efficiency Over Time</div>
            <Badge>12-week trend</Badge>
          </div>
          <MiniLineChart data={efficiencyData} color={theme.accent.primary} height={80} width={700} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "0 4px" }}>
            {["W1","W2","W3","W4","W5","W6","W7","W8","W9","W10","W11","W12"].map(w => (
              <span key={w} style={{ fontSize: 10, color: theme.text.muted }}>{w}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── TEAM VIEW ───
  const TeamView = () => (
    <div style={{ padding: 24, overflowY: "auto", flex: 1 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {teamMembers.map(m => {
          const memberTasks = tasks.filter(t => t.assignee.id === m.id);
          const done = memberTasks.filter(t => t.status === "done").length;
          const inProg = memberTasks.filter(t => t.status === "inProgress").length;
          const hours = memberTasks.reduce((a, t) => a + t.timeSpent, 0);
          const pct = memberTasks.length ? Math.round((done / memberTasks.length) * 100) : 0;
          return (
            <div key={m.id} style={{
              background: theme.bg.card, borderRadius: 16, padding: 24,
              border: `1px solid ${theme.border.subtle}`, position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: -40, right: -40, width: 120, height: 120,
                background: `radial-gradient(circle, ${m.color}10, transparent)`, borderRadius: "50%",
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <Avatar member={m} size={44} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: theme.text.primary }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: theme.text.muted }}>Team Member</div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <ProgressRing progress={pct} size={40} strokeWidth={4} color={m.color} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { label: "Tasks", value: memberTasks.length, color: theme.text.primary },
                  { label: "Done", value: done, color: theme.accent.success },
                  { label: "Hours", value: `${hours}h`, color: theme.accent.secondary },
                ].map(s => (
                  <div key={s.label} style={{
                    background: theme.bg.secondary, borderRadius: 10, padding: "10px 12px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 10, color: theme.text.muted, textTransform: "uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 4 }}>
                {memberTasks.filter(t => t.status !== "done").slice(0, 3).map(t => (
                  <div key={t.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "6px 10px", borderRadius: 8, background: theme.bg.secondary,
                  }}>
                    <span style={{ fontSize: 12, color: theme.text.secondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 180 }}>
                      {t.name}
                    </span>
                    <StatusBadge status={t.status} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ─── TASK DETAIL PANEL ───
  const TaskDetail = ({ task, onClose }) => {
    if (!task) return null;
    return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)", display: "flex", justifyContent: "flex-end",
      }} onClick={onClose}>
        <div onClick={e => e.stopPropagation()} style={{
          width: 420, height: "100%", background: theme.bg.card,
          borderLeft: `1px solid ${theme.border.medium}`, padding: 28,
          overflowY: "auto", animation: "slideIn 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <StatusBadge status={task.status} />
            <button onClick={onClose} style={{ background: "none", border: "none", color: theme.text.muted, cursor: "pointer" }}><Icons.X /></button>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: theme.text.primary, marginBottom: 8, lineHeight: 1.3 }}>{task.name}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>{task.project.icon}</span>
            <span style={{ fontSize: 13, color: theme.text.muted }}>{task.project.name}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: theme.text.muted }}>Assignee</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar member={task.assignee} size={24} />
                <span style={{ fontSize: 13, color: theme.text.primary, fontWeight: 500 }}>{task.assignee.name}</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: theme.text.muted }}>Priority</span>
              <PriorityIndicator priority={task.priority} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: theme.text.muted }}>Due Date</span>
              <span style={{ fontSize: 13, color: theme.text.primary }}>{task.dueDate}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: theme.text.muted }}>Time</span>
              <span style={{ fontSize: 13, color: theme.text.primary }}>{task.timeSpent}h / {task.timeEstimate}h</span>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: theme.text.muted }}>Progress</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: theme.text.primary }}>{task.progress}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: theme.bg.secondary, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 4, width: `${task.progress}%`,
                  background: task.progress === 100
                    ? `linear-gradient(90deg, ${theme.accent.success}, ${theme.accent.success}88)`
                    : `linear-gradient(90deg, ${theme.accent.primary}, ${theme.accent.primaryHover})`,
                }} />
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${theme.border.subtle}`, paddingTop: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: theme.text.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Quick Actions
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["todo", "inProgress", "review", "done"].filter(s => s !== task.status).map(s => (
                  <button key={s} onClick={() => { updateTaskStatus(task.id, s); onClose(); }} style={{
                    padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
                    background: theme.status[s].bg, color: theme.status[s].text,
                    border: `1px solid ${theme.status[s].border}`, transition: "all 0.2s",
                  }}>
                    Move to {s === "inProgress" ? "In Progress" : s === "todo" ? "To Do" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── RENDER ───
  return (
    <div style={{
      display: "flex", height: "100vh", width: "100%", background: theme.bg.primary,
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      color: theme.text.primary, overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${theme.border.medium}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.border.strong}; }
        select option { background: ${theme.bg.card}; color: ${theme.text.primary}; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        input::placeholder { color: ${theme.text.muted}; }
      `}</style>

      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar />
        {activeView === "dashboard" && <DashboardView />}
        {activeView === "board" && <BoardView />}
        {activeView === "timeline" && <TimelineView />}
        {activeView === "reports" && <ReportsView />}
        {activeView === "team" && <TeamView />}
      </div>

      {showAddTask && <AddTaskModal onClose={() => setShowAddTask(false)} onAdd={addTask} projects={initialProjects} />}
      {selectedTask && <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  );
}
