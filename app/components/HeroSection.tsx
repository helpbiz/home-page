"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950"
        >
            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern" />

            {/* Particle animation */}
            <ParticleBackground />

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.06)_0%,transparent_50%)]" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/20 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-dot" />
                    <span className="text-sm font-medium text-neon-green">
                        특허 기반 솔루션 · 기술혁신형 기업
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 tracking-tight"
                >
                    <span className="text-text-primary">데이터로 증명하는</span>
                    <br />
                    <span className="gradient-text">스마트 행정</span>
                    <span className="text-text-primary">,</span>
                    <br />
                    <span className="text-text-primary">예산 절감의 </span>
                    <span className="text-neon-green">새로운 기준</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    특허 기반 원가산정 프로그램과 실시간 IoT 관제 시스템으로
                    <br className="hidden sm:block" />
                    지자체 자원순환의 중력을 낮춥니다.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#contact"
                        className="group flex items-center gap-2 px-8 py-4 bg-neon-green text-navy-950 font-semibold rounded-xl glow-green-hover hover:scale-105 transition-all duration-300"
                    >
                        솔루션 데모 신청
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="#solutions"
                        className="group flex items-center gap-2 px-8 py-4 border border-text-muted/30 text-text-secondary rounded-xl hover:border-electric-blue hover:text-electric-blue glow-blue-hover transition-all duration-300"
                    >
                        <Download className="w-5 h-5" />
                        기술 브로슈어 다운로드
                    </a>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
                >
                    {[
                        { value: "30%", label: "행정효율 향상" },
                        { value: "24/7", label: "실시간 관제" },
                        { value: "5건+", label: "지자체 도입" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-neon-green">
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm text-text-muted mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-text-muted">스크롤하여 더보기</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ChevronDown className="w-5 h-5 text-text-muted" />
                </motion.div>
            </motion.div>
        </section>
    );
}
