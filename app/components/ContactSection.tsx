"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, User, Mail, Building, Briefcase, MessageSquare, Phone, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        organization: "",
        department: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitError("");

        const payload = new FormData();
        payload.set("name", formData.name.trim());
        payload.set("phone", formData.phone.trim());
        payload.set("email", formData.email.trim());
        payload.set("organization", formData.organization.trim());
        payload.set("department", formData.department.trim());
        payload.set("message", formData.message.trim());
        payload.set("_subject", `[상담신청] ${formData.organization.trim()} ${formData.name.trim()}`);
        payload.set("_template", "table");
        payload.set("_captcha", "false");

        try {
            const response = await fetch("https://formsubmit.co/ajax/helpbiz@naver.com", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: payload,
            });

            if (!response.ok) {
                throw new Error("request_failed");
            }

            setSubmitted(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                organization: "",
                department: "",
                message: "",
            });
        } catch (_error) {
            setSubmitError("전송에 실패했습니다. helpbiz@naver.com 으로 직접 연락해 주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        "w-full px-4 py-3.5 rounded-xl bg-navy-800/70 border border-glass-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/20 transition-all duration-300";

    return (
        <section id="contact" className="relative py-24 lg:py-32 bg-navy-900/50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(59,130,246,0.05)_0%,transparent_60%)]" />

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
                        문의하기
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                        지금 바로{" "}
                        <span className="gradient-text">상담 신청</span>하세요
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        지자체 환경에 최적화된 맞춤형 솔루션을 제안드립니다.
                        <br />
                        담당자 연락처를 남겨주시면 24시간 내 회신 드리겠습니다.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Left info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {[
                            {
                                icon: Phone,
                                title: "전화 문의",
                                desc: "평일 09:00 ~ 18:00",
                                value: "(031)944-4365",
                            },
                            {
                                icon: Mail,
                                title: "이메일 문의",
                                desc: "24시간 접수 가능",
                                value: "helpbiz@naver.com",
                            },
                            {
                                icon: Building,
                                title: "방문 상담",
                                desc: "사전 예약 필수",
                                value: "경기도 파주시 운정",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                className="flex items-start gap-4 p-5 rounded-xl bg-navy-800/50 border border-glass-border group hover:border-neon-green/20 transition-all duration-300"
                            >
                                <div className="w-11 h-11 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center flex-shrink-0 group-hover:bg-neon-green/15 transition-colors">
                                    <item.icon className="w-5 h-5 text-neon-green" />
                                </div>
                                <div>
                                    <p className="font-semibold text-text-primary text-sm">{item.title}</p>
                                    <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                                    <p className="text-sm text-text-secondary mt-1">{item.value}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Quick info box */}
                        <div className="p-5 rounded-xl bg-neon-green/5 border border-neon-green/15">
                            <p className="text-sm font-semibold text-neon-green mb-2">
                                🎯 무료 컨설팅 제공
                            </p>
                            <p className="text-xs text-text-secondary leading-relaxed">
                                지자체 현황 분석부터 솔루션 커스터마이징까지,
                                전문 컨설턴트가 무상으로 진행해 드립니다.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="lg:col-span-3"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="p-8 rounded-2xl bg-navy-800/30 border border-glass-border backdrop-blur-sm"
                        >
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-16 text-center"
                                >
                                    <CheckCircle2 className="w-16 h-16 text-neon-green mb-4" />
                                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                                        접수 완료!
                                    </h3>
                                    <p className="text-text-secondary">
                                        상담 신청이 자동 접수되었습니다. 24시간 내 담당자가 연락드리겠습니다.
                                    </p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="담당자명"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className={`${inputClass} pl-11`}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="연락처"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className={`${inputClass} pl-11`}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative mb-4">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="이메일"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className={`${inputClass} pl-11`}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div className="relative">
                                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                            <input
                                                type="text"
                                                name="organization"
                                                placeholder="소속 기관 (예: ○○시청)"
                                                value={formData.organization}
                                                onChange={handleChange}
                                                required
                                                className={`${inputClass} pl-11`}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                            <input
                                                type="text"
                                                name="department"
                                                placeholder="소속 부서 (예: 환경과)"
                                                value={formData.department}
                                                onChange={handleChange}
                                                className={`${inputClass} pl-11`}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative mb-6">
                                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-text-muted" />
                                        <textarea
                                            name="message"
                                            rows={4}
                                            placeholder="문의 내용을 입력해 주세요 (관심 솔루션, 현재 과제 등)"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className={`${inputClass} pl-11 resize-none`}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-neon-green text-navy-950 font-semibold rounded-xl glow-green-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                                    >
                                        <Send className="w-5 h-5" />
                                        {isSubmitting ? "전송 중..." : "상담 신청하기"}
                                    </button>

                                    {submitError ? (
                                        <p className="text-xs text-red-300 text-center mt-3">{submitError}</p>
                                    ) : null}

                                    <p className="text-xs text-text-muted text-center mt-4">
                                        제출하신 정보는 상담 목적으로만 사용되며, 개인정보 보호정책에 따라 안전하게 관리됩니다.
                                    </p>
                                </>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
