"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, BookOpen, Building2, Users, FileCheck, GraduationCap } from "lucide-react";

const stats = [
    {
        icon: Award,
        value: 1,
        suffix: "건",
        label: "특허등록",
        description: "특허출원 2건 진행 중",
        color: "#22C55E",
    },
    {
        icon: FileCheck,
        value: 10,
        suffix: "건+",
        label: "학술용역 수행",
        description: "관련 학술용역 수행 다수",
        color: "#3B82F6",
    },
    {
        icon: Building2,
        value: 5,
        suffix: "개+",
        label: "지자체 도입",
        description: "다수 지자체 도입 검토 중",
        color: "#06B6D4",
    },
    {
        icon: GraduationCap,
        value: 15,
        suffix: "년+",
        label: "업계 경력",
        description: "공공행정 분야 전문성",
        color: "#8B5CF6",
    },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span ref={ref}>
            {count}
            <span className="text-lg font-normal ml-0.5">{suffix}</span>
        </span>
    );
}

export default function TrustSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="trust" className="relative py-24 lg:py-32 bg-navy-950">
            <div className="absolute inset-0 grid-pattern" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(34,197,94,0.04)_0%,transparent_60%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-sm font-medium mb-4">
                        신뢰 지표
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                        숫자로 증명하는{" "}
                        <span className="gradient-text">전문성</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        특허 기술과 학술 연구 실적을 바탕으로, 검증된 솔루션을 제공합니다.
                    </p>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group relative p-6 rounded-2xl bg-navy-800/50 border border-glass-border backdrop-blur-sm hover:border-opacity-50 transition-all duration-500 text-center"
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-700 blur-2xl"
                                style={{ background: stat.color }}
                            />

                            <div
                                className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                                style={{
                                    background: `${stat.color}10`,
                                    border: `1px solid ${stat.color}25`,
                                }}
                            >
                                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                            </div>

                            <div className="text-3xl lg:text-4xl font-bold text-text-primary mb-1" style={{ color: stat.color }}>
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            </div>

                            <p className="text-sm font-semibold text-text-primary mb-1">
                                {stat.label}
                            </p>
                            <p className="text-xs text-text-muted">{stat.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Trust badges */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-12 flex flex-wrap items-center justify-center gap-6"
                >
                    {[
                        "특허청 등록 기술",
                        "기술혁신형 중소기업",
                        "학술용역 수행 실적",
                        "공공조달 등록",
                    ].map((badge) => (
                        <div
                            key={badge}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy-800/50 border border-glass-border"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                            <span className="text-sm text-text-secondary">{badge}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
