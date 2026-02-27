"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, Radio, Watch, ArrowUpRight, Shield, TrendingUp, MapPin } from "lucide-react";

const solutions = [
    {
        icon: Calculator,
        badge: "특허 기술",
        title: "원가산정 자동화",
        description:
            "특허 기반 알고리즘으로 생활폐기물 수집·운반·처리 원가를 자동 산정합니다. 기존 수작업 대비 행정 효율 30% 이상 향상, 연간 수천만 원의 비용 절감 효과를 제공합니다.",
        features: ["특허등록 알고리즘", "행정 효율 30%↑", "자동 보고서 생성"],
        color: "neon-green",
        colorHex: "#22C55E",
        subIcon: TrendingUp,
    },
    {
        icon: Radio,
        badge: "IoT 기술",
        title: "IoT 실시간 관제",
        description:
            "GPS 기반 쓰레기통 적재량 실시간 모니터링 시스템입니다. 수거 노선 최적화로 불필요한 운행을 줄이고, 지능형 스케줄링으로 민원 발생률을 대폭 감소시킵니다.",
        features: ["GPS 적재량 모니터링", "수거 노선 최적화", "민원 감소 45%↓"],
        color: "electric-blue",
        colorHex: "#3B82F6",
        subIcon: MapPin,
    },
    {
        icon: Watch,
        badge: "안전 솔루션",
        title: "스마트워치 안전관리",
        description:
            "근로자 건강 지표를 실시간으로 수집·분석하여 위험 상황을 사전에 감지합니다. 근거 중심의 현장 관리로 산업재해를 예방하고, 안전한 작업 환경을 보장합니다.",
        features: ["실시간 건강 모니터링", "위험 사전 감지", "산재 예방 시스템"],
        color: "cyan-accent",
        colorHex: "#06B6D4",
        subIcon: Shield,
    },
];

function SolutionCard({
    solution,
    index,
}: {
    solution: (typeof solutions)[0];
    index: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
            className="group relative"
        >
            <div className="relative h-full p-8 rounded-2xl bg-navy-800/50 border border-glass-border backdrop-blur-sm hover:border-opacity-50 transition-all duration-500 overflow-hidden"
                style={{
                    ["--card-color" as string]: solution.colorHex,
                }}
            >
                {/* Hover glow */}
                <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-3xl"
                    style={{ background: solution.colorHex }}
                />

                {/* Badge */}
                <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6"
                    style={{
                        background: `${solution.colorHex}15`,
                        color: solution.colorHex,
                        border: `1px solid ${solution.colorHex}30`,
                    }}
                >
                    <solution.subIcon className="w-3 h-3" />
                    {solution.badge}
                </div>

                {/* Icon */}
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{
                        background: `${solution.colorHex}10`,
                        border: `1px solid ${solution.colorHex}25`,
                    }}
                >
                    <solution.icon className="w-7 h-7" style={{ color: solution.colorHex }} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-white transition-colors">
                    {solution.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {solution.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                    {solution.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                            <div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: solution.colorHex }}
                            />
                            {f}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 group/link"
                    style={{ color: solution.colorHex }}
                >
                    자세히 알아보기
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
            </div>
        </motion.div>
    );
}

export default function SolutionsSection() {
    const titleRef = useRef(null);
    const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

    return (
        <section id="solutions" className="relative py-24 lg:py-32 bg-navy-950">
            <div className="absolute inset-0 grid-pattern" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-4">
                        핵심 솔루션
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                        지자체를 위한{" "}
                        <span className="gradient-text">올인원 솔루션</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        특허 기술과 IoT를 결합하여, 행정 비용은 줄이고 서비스 품질은 높이는
                        혁신적인 솔루션을 제공합니다.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {solutions.map((sol, i) => (
                        <SolutionCard key={sol.title} solution={sol} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
