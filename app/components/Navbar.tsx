"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navItems = [
    { label: "홈", href: "#hero" },
    { label: "솔루션", href: "#solutions" },
    { label: "대시보드", href: "#dashboard" },
    { label: "실적", href: "#trust" },
    { label: "문의", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "bg-navy-950/90 backdrop-blur-xl border-b border-glass-border shadow-lg shadow-navy-950/50"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center group-hover:bg-neon-green/20 transition-all duration-300">
                            <Zap className="w-5 h-5 text-neon-green" />
                        </div>
                        <span className="text-xl font-bold text-text-primary">
                            공비<span className="text-neon-green">Lab</span>
                        </span>
                    </a>
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-neon-green transition-colors duration-300 relative group"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-neon-green group-hover:w-3/4 transition-all duration-300" />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="ml-4 px-5 py-2.5 text-sm font-semibold bg-neon-green text-navy-950 rounded-lg hover:bg-neon-green/90 glow-green-hover transition-all duration-300"
                        >
                            상담 신청
                        </a>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-text-secondary hover:text-neon-green transition-colors"
                        aria-label="메뉴 토글"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-navy-900/95 backdrop-blur-xl border-t border-glass-border"
                    >
                        <div className="px-6 py-4 space-y-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-text-secondary hover:text-neon-green hover:bg-navy-800/50 rounded-lg transition-all duration-300"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="block mt-3 px-4 py-3 text-center text-sm font-semibold bg-neon-green text-navy-950 rounded-lg"
                            >
                                상담 신청
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
