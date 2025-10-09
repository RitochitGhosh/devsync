"use client";

import React, { useEffect, useRef, useState } from "react";

const HeroPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Wave animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.015;

      const waves = [
        { color: "rgba(239, 68, 68, 0.8)", yOffset: 0, amplitude: 100, frequency: 0.002, phase: 0 },
        { color: "rgba(220, 38, 38, 0.6)", yOffset: 15, amplitude: 85, frequency: 0.0025, phase: 1 },
        { color: "rgba(34, 197, 94, 0.5)", yOffset: -25, amplitude: 75, frequency: 0.003, phase: 2 },
        { color: "rgba(168, 85, 247, 0.7)", yOffset: 35, amplitude: 110, frequency: 0.0018, phase: 1.5 },
        { color: "rgba(192, 132, 252, 0.6)", yOffset: 50, amplitude: 90, frequency: 0.0022, phase: 0.5 },
        { color: "rgba(147, 51, 234, 0.5)", yOffset: 25, amplitude: 95, frequency: 0.0028, phase: 2.5 },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 15;
        ctx.shadowColor = wave.color;

        for (let x = 0; x <= canvas.width; x += 1) {
          const y =
            canvas.height * 0.6 +
            Math.sin(x * wave.frequency + time + wave.phase) * wave.amplitude +
            Math.sin(x * wave.frequency * 1.5 + time * 1.2) * (wave.amplitude * 0.4) +
            Math.cos(x * wave.frequency * 0.5 + time * 0.8) * (wave.amplitude * 0.3) +
            wave.yOffset;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(drawWave);
    };

    drawWave();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-20"></div>

      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-30 blur-3xl transition-all duration-300 ease-out z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1]" />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-6 max-w-[1400px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg rotate-45"></div>
            <div className="absolute inset-0.5 bg-black rounded-lg rotate-45"></div>
            <div className="absolute inset-1 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg rotate-45"></div>
          </div>
          <span className="text-white text-2xl font-semibold tracking-tight">DevSync</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 px-5 py-3.5 rounded-full border border-gray-700/60 backdrop-blur-md bg-gray-900/40 hover:border-gray-600/80 transition-all duration-300">
          {["Home", "Projects", "Team", "Testimonials", "FAQs", "Get In Touch"].map((item) => (
            <button
              key={item}
              className="relative px-5 py-2.5 text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium rounded-full group overflow-hidden"
            >
              <span className="relative z-10">{item}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <button className="px-7 py-3.5 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white rounded-full font-medium hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1 justify-center items-center p-3 rounded-md bg-gray-800 hover:bg-gray-700 transition z-30"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-white transition-opacity ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* ✅ Fullscreen Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-6 text-gray-300 text-xl z-40 animate-fade-in"
          onClick={() => setMenuOpen(false)}
        >
          {["Home", "Projects", "Team", "Testimonials", "FAQs", "Get In Touch"].map((item) => (
            <button
              key={item}
              onClick={() => setMenuOpen(false)}
              className="hover:text-white transition-all duration-300"
            >
              {item}
            </button>
          ))}
          <button className="mt-3 px-8 py-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300">
            Get Started
          </button>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 min-h-[calc(100vh-120px)]">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white mb-8 tracking-tight leading-tight">
            <span className="inline-block animate-slide-up hover:scale-110 transition-transform duration-300 cursor-default delay-[100ms]">
              Clarity.
            </span>{" "}
            <span className="inline-block animate-slide-up hover:scale-110 transition-transform duration-300 cursor-default delay-[300ms]">
              Focus.
            </span>{" "}
            <span className="inline-block animate-slide-up hover:scale-110 transition-transform duration-300 cursor-default delay-[500ms]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 hover:from-purple-300 hover:via-pink-300 hover:to-purple-400 transition-all duration-300">
                Impact.
              </span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-light tracking-wide animate-fade-in-delay max-w-4xl mx-auto hover:text-gray-300 transition-colors duration-300 cursor-default">
            We turn complex ideas into effortless experiences
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
