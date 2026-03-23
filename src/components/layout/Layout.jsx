import React, { useMemo } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout – Global wrapper for all pages
 * Includes animated background, floating particles, geometric grid, and color gradients.
 */
const Layout = ({ children }) => {
  // Precompute particle positions + delays for performance (memoized to avoid rerenders)
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${15 + Math.random() * 10}s`,
    }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-deep-navy text-white overflow-hidden">
      {/* === Background Layer === */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* ✨ Floating gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-blue/20 to-neon-mint/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-emerald/15 to-cyan-blue/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '3s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-neon-mint/5 to-cyan-blue/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1.5s' }}
        ></div>

        {/* 🟩 Subtle geometric grid pattern */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#3A506B 1px, transparent 1px),
                               linear-gradient(90deg, #3A506B 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
            }}
          ></div>
        </div>

        {/* 🫧 Animated floating particles */}
        <div className="absolute inset-0">
          {particles.map(({ id, left, top, delay, duration }) => (
            <div
              key={id}
              className="absolute w-2 h-2 bg-neon-mint/30 rounded-full animate-float"
              style={{
                left,
                top,
                animationDelay: delay,
                animationDuration: duration,
              }}
            ></div>
          ))}
        </div>

        {/* 🟦 Decorative corner lines */}
        <div className="absolute top-10 left-10 w-6 h-6 border-l-2 border-t-2 border-neon-mint/30"></div>
        <div className="absolute top-10 right-10 w-6 h-6 border-r-2 border-t-2 border-emerald/30"></div>
        <div className="absolute bottom-10 left-10 w-6 h-6 border-l-2 border-b-2 border-cyan-blue/40"></div>
        <div className="absolute bottom-10 right-10 w-6 h-6 border-r-2 border-b-2 border-neon-mint/30"></div>
      </div>

      {/* === Subtle glow overlays === */}
      <div
        className="fixed inset-0 -z-[5] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 80%, rgba(111, 255, 233, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 168, 150, 0.03) 0%, transparent 50%)',
        }}
      ></div>

      {/* === Layout content === */}
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
