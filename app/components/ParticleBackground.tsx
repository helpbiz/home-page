"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const colors = ["#22C55E", "#3B82F6", "#06B6D4", "#8B5CF6"];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouse);

        // Initialize particles
        const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const particles = particlesRef.current;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = p.color;
                        ctx.globalAlpha = (1 - dist / 150) * 0.15;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Mouse interaction
                const mdx = p.x - mouseRef.current.x;
                const mdy = p.y - mouseRef.current.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < 200) {
                    const force = (200 - mDist) / 200;
                    p.vx += (mdx / mDist) * force * 0.02;
                    p.vy += (mdy / mDist) * force * 0.02;
                }

                // Damping
                p.vx *= 0.99;
                p.vy *= 0.99;
            }

            ctx.globalAlpha = 1;
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
}
