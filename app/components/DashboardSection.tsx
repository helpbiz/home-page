"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Activity, MapPin, TrendingDown, Wifi, CircleDot } from "lucide-react";

// Generate mock data for charts
function generateBudgetData() {
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    return months.map((m, i) => ({
        month: m,
        before: 100 - Math.random() * 5,
        after: 100 - (i + 1) * 2.5 - Math.random() * 3,
    }));
}

function generateComplaintData() {
    const months = ["1월", "2월", "3월", "4월", "5월", "6월"];
    return months.map((m, i) => ({
        month: m,
        complaints: Math.max(5, 45 - i * 7 - Math.floor(Math.random() * 5)),
    }));
}

// Map visualization component
function MapVisualization() {
    const points = [
        { id: 1, top: "20%", left: "30%", fill: 80, status: "full" },
        { id: 2, top: "35%", left: "55%", fill: 45, status: "normal" },
        { id: 3, top: "50%", left: "25%", fill: 92, status: "full" },
        { id: 4, top: "45%", left: "70%", fill: 30, status: "normal" },
        { id: 5, top: "65%", left: "45%", fill: 65, status: "warning" },
        { id: 6, top: "30%", left: "75%", fill: 15, status: "normal" },
        { id: 7, top: "70%", left: "65%", fill: 88, status: "full" },
        { id: 8, top: "55%", left: "50%", fill: 55, status: "warning" },
    ];

    const getColor = (status: string) => {
        switch (status) {
            case "full": return "#EF4444";
            case "warning": return "#F59E0B";
            default: return "#22C55E";
        }
    };

    return (
        <div className="relative w-full h-full min-h-[300px] rounded-xl bg-navy-900/80 border border-glass-border overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            {/* Simulated map area outlines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                <path d="M20,15 Q30,10 45,20 T70,18 L75,35 Q80,50 70,65 L55,75 Q40,80 25,70 L15,50 Q12,35 20,15Z" fill="none" stroke="#3B82F6" strokeWidth="0.5" />
                <path d="M30,25 Q40,22 50,30 L60,28 L65,40 Q62,52 55,60 L40,65 Q32,60 28,45 Z" fill="#3B82F6" fillOpacity="0.05" stroke="#3B82F6" strokeWidth="0.3" />
            </svg>

            {/* Header */}
            <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                    <MapPin className="w-3.5 h-3.5 text-electric-blue" />
                    <span className="font-medium text-text-secondary">실시간 수거함 모니터링</span>
                </div>
            </div>

            {/* Live badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20 z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-dot" />
                <span className="text-[10px] font-medium text-red-400">LIVE</span>
            </div>

            {/* Map points */}
            {points.map((p) => (
                <div
                    key={p.id}
                    className="absolute z-10 group cursor-pointer"
                    style={{ top: p.top, left: p.left }}
                >
                    {/* Ping effect */}
                    <div
                        className="absolute -inset-2 rounded-full animate-ping opacity-20"
                        style={{ background: getColor(p.status) }}
                    />
                    <div
                        className="relative w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{
                            background: `${getColor(p.status)}30`,
                            borderColor: getColor(p.status),
                        }}
                    >
                        <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: getColor(p.status) }}
                        />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden group-hover:block z-20">
                        <div className="px-3 py-2 rounded-lg bg-navy-800 border border-glass-border shadow-xl whitespace-nowrap">
                            <p className="text-xs font-medium text-text-primary">수거함 #{p.id}</p>
                            <p className="text-[10px] text-text-muted">적재량: {p.fill}%</p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 z-10">
                {[
                    { color: "#22C55E", label: "정상" },
                    { color: "#F59E0B", label: "주의" },
                    { color: "#EF4444", label: "수거 필요" },
                ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                        <span className="text-[10px] text-text-muted">{l.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Custom tooltip for recharts
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
    if (!active || !payload) return null;
    return (
        <div className="px-3 py-2 rounded-lg bg-navy-800 border border-glass-border shadow-xl">
            <p className="text-xs font-medium text-text-primary mb-1">{label}</p>
            {payload.map((p, i) => (
                <p key={i} className="text-[10px] text-text-muted">
                    {p.name}: {typeof p.value === "number" ? p.value.toFixed(1) : p.value}
                </p>
            ))}
        </div>
    );
}

export default function DashboardSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [budgetData, setBudgetData] = useState<{ month: string, before: number, after: number }[]>([]);
    const [complaintData, setComplaintData] = useState<{ month: string, complaints: number }[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setBudgetData(generateBudgetData());
        setComplaintData(generateComplaintData());
    }, []);

    // Live counter
    const [liveStats, setLiveStats] = useState({
        active: 127,
        collected: 48,
        efficiency: 94.2,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveStats((prev) => ({
                active: prev.active + (Math.random() > 0.5 ? 1 : -1),
                collected: prev.collected + (Math.random() > 0.7 ? 1 : 0),
                efficiency: Math.min(99.9, Math.max(90, prev.efficiency + (Math.random() - 0.5) * 0.3)),
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="dashboard" className="relative py-24 lg:py-32 bg-navy-900/50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.05)_0%,transparent_60%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-4">
                        실시간 대시보드
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                        IoT 관제 시스템{" "}
                        <span className="gradient-text">미리보기</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        실시간으로 수집되는 데이터를 직관적인 대시보드에서 한눈에 확인하세요.
                    </p>
                </motion.div>

                {/* Dashboard UI */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="rounded-2xl bg-navy-900/80 border border-glass-border backdrop-blur-sm overflow-hidden shadow-2xl shadow-navy-950/50"
                >
                    {/* Dashboard header bar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-glass-border">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                            </div>
                            <span className="text-sm text-text-muted font-mono">
                                dashboard.gongbi-lab.kr
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Wifi className="w-4 h-4 text-neon-green" />
                            <span className="text-xs text-neon-green font-medium">Connected</span>
                        </div>
                    </div>

                    {/* Live stats bar */}
                    <div className="grid grid-cols-3 gap-px bg-glass-border">
                        {[
                            {
                                icon: CircleDot,
                                label: "활성 수거함",
                                value: liveStats.active,
                                unit: "개",
                                color: "#22C55E",
                            },
                            {
                                icon: Activity,
                                label: "금일 수거 완료",
                                value: liveStats.collected,
                                unit: "건",
                                color: "#3B82F6",
                            },
                            {
                                icon: TrendingDown,
                                label: "시스템 가동률",
                                value: liveStats.efficiency.toFixed(1),
                                unit: "%",
                                color: "#06B6D4",
                            },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className="flex items-center gap-3 px-6 py-4 bg-navy-900/80"
                            >
                                <s.icon className="w-5 h-5 flex-shrink-0" style={{ color: s.color }} />
                                <div>
                                    <p className="text-xs text-text-muted">{s.label}</p>
                                    <p className="text-lg font-bold text-text-primary">
                                        {s.value}
                                        <span className="text-xs font-normal text-text-muted ml-1">
                                            {s.unit}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main dashboard content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-glass-border">
                        {/* Left - Map */}
                        <div className="p-6 bg-navy-900/80">
                            <MapVisualization />
                        </div>

                        {/* Right - Charts */}
                        <div className="p-6 bg-navy-900/80 space-y-6">
                            {/* Budget chart */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-semibold text-text-primary">
                                        예산 절감 추이
                                    </h4>
                                    <span className="text-xs text-neon-green font-medium">
                                        ▼ 30% 절감
                                    </span>
                                </div>
                                <div className="h-40">
                                    {isMounted && (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={budgetData}>
                                                <defs>
                                                    <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                                                <XAxis
                                                    dataKey="month"
                                                    tick={{ fontSize: 10, fill: "#64748B" }}
                                                    axisLine={{ stroke: "#1E293B" }}
                                                    tickLine={false}
                                                />
                                                <YAxis
                                                    tick={{ fontSize: 10, fill: "#64748B" }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                    domain={[60, 105]}
                                                />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="before"
                                                    stroke="#475569"
                                                    strokeWidth={1.5}
                                                    strokeDasharray="4 4"
                                                    dot={false}
                                                    name="도입 전"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="after"
                                                    stroke="#22C55E"
                                                    strokeWidth={2}
                                                    fill="url(#gradGreen)"
                                                    dot={false}
                                                    name="도입 후"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            </div>

                            {/* Complaint chart */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-semibold text-text-primary">
                                        민원 감소율
                                    </h4>
                                    <span className="text-xs text-electric-blue font-medium">
                                        ▼ 45% 감소
                                    </span>
                                </div>
                                <div className="h-32">
                                    {isMounted && (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={complaintData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                                                <XAxis
                                                    dataKey="month"
                                                    tick={{ fontSize: 10, fill: "#64748B" }}
                                                    axisLine={{ stroke: "#1E293B" }}
                                                    tickLine={false}
                                                />
                                                <YAxis
                                                    tick={{ fontSize: 10, fill: "#64748B" }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Bar
                                                    dataKey="complaints"
                                                    fill="#3B82F6"
                                                    radius={[4, 4, 0, 0]}
                                                    name="민원 건수"
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
