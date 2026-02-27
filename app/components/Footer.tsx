"use client";

import { Zap } from "lucide-react";

const footerLinks = {
    solutions: [
        { label: "원가산정 자동화", href: "#solutions" },
        { label: "IoT 실시간 관제", href: "#solutions" },
        { label: "스마트워치 안전관리", href: "#solutions" },
    ],
    company: [
        { label: "회사 소개", href: "#trust" },
        { label: "특허 기술", href: "#trust" },
        { label: "문의하기", href: "#contact" },
    ],
};

export default function Footer() {
    return (
        <footer className="relative bg-navy-950 border-t border-glass-border">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <a href="#hero" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-neon-green" />
                            </div>
                            <span className="text-lg font-bold text-text-primary">
                                공비<span className="text-neon-green">Lab</span>
                            </span>
                        </a>
                        <p className="text-sm text-text-muted max-w-xs leading-relaxed mb-4">
                            데이터 기반 스마트 행정 솔루션으로 지자체의 효율적인 자원순환을 지원합니다.
                            특허 기술과 IoT, AI를 결합한 혁신적인 B2G 솔루션을 제공합니다.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-dot" />
                            <span className="text-xs text-text-muted">
                                시스템 정상 운영 중
                            </span>
                        </div>
                    </div>

                    {/* Solutions links */}
                    <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-4">
                            솔루션
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.solutions.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-text-muted hover:text-neon-green transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company links */}
                    <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-4">
                            회사
                        </h4>
                        <ul className="space-y-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-text-muted hover:text-neon-green transition-colors duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-text-muted">
                        © 2026 공비Lab. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
                            개인정보처리방침
                        </a>
                        <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
                            이용약관
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
