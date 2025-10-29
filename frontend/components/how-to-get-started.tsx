"use client"

import React from 'react'

export default function HowToGetStarted() {
  return (
    <section
      id="get-started"
      aria-label="How to Get Started with CognixAI Labs"
      className="relative py-16 md:py-24 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,255,224,0.06),transparent),linear-gradient(180deg,rgba(4,18,28,1),rgba(4,18,28,0.92))]"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight text-[color:var(--on-brand,#fff)]">
          How to Get Started with CognixAI Labs
        </h2>
        <p className="mt-3 text-center text-[14px] md:text-[15px] text-[color:var(--text,#cfd8dc)]">
          A streamlined, outcomes-first journey — from goals, to your custom AI agent, to launch.
        </p>

        <div className="relative mx-auto mt-10 md:mt-14 w-full max-w-6xl aspect-[2/1] rounded-xl overflow-hidden bg-[linear-gradient(180deg,rgba(9,23,34,0.8),rgba(9,23,34,0.6))] border border-[color:var(--border,#0b2c3b)]">
          <svg viewBox="0 0 1600 800" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="get-started-title">
            <title id="get-started-title">Three-step flow: Share Your Goals → Build Your Custom AI Agent → Launch & Scale</title>
            <defs>
              <linearGradient id="conn" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00E6C3" stopOpacity="0.0" />
                <stop offset="20%" stopColor="#00E6C3" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#59F5FF" stopOpacity="0.9" />
                <stop offset="80%" stopColor="#8A5BFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8A5BFF" stopOpacity="0.0" />
              </linearGradient>
              <radialGradient id="node" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0df6d0" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#0aa3b3" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0a3a4a" stopOpacity="0.2" />
              </radialGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connections: flowing curved lines */}
            <g fill="none" strokeLinecap="round">
              {/* 1 -> 2 */}
              <path d="M420,430 C700,200 900,200 1120,400" stroke="rgba(0,230,195,0.25)" strokeWidth="10" />
              <path className="flow-path" d="M420,430 C700,200 900,200 1120,400" stroke="url(#conn)" strokeWidth="6" />
              {/* 2 -> 3 */}
              <path d="M1120,400 C1280,520 1380,520 1480,430" stroke="rgba(138,91,255,0.25)" strokeWidth="10" />
              <path className="flow-path-delayed" d="M1120,400 C1280,520 1380,520 1480,430" stroke="url(#conn)" strokeWidth="6" />
            </g>

            {/* Step 1: Share Your Goals */}
            <g transform="translate(320,420)">
              <circle r="90" fill="url(#node)" filter="url(#glow)" className="node-pulse" />
              {/* Person with chat icon */}
              <g transform="translate(-28,-28)" fill="#E8F6F8">
                <circle cx="28" cy="20" r="16" />
                <path d="M0,63 C0,42 19,28 40,28 C61,28 80,42 80,63 L80,70 L0,70 Z" />
                <rect x="90" y="-2" rx="8" ry="8" width="120" height="48" />
                <path d="M100,40 L100,68 L126,52 Z" />
              </g>
              <text x="0" y="150" textAnchor="middle" fontSize="28" fill="#cde8ee" fontWeight="600">Share Your Goals</text>
            </g>

            {/* Step 2: Build Your Custom AI Agent */}
            <g transform="translate(1120,360)">
              <circle r="90" fill="url(#node)" filter="url(#glow)" className="node-pulse" />
              {/* Brain-circuit/cog hybrid */}
              <g transform="translate(-42,-42)" stroke="#E8F6F8" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="42" cy="42" r="30" />
                <path d="M12,42 H0 M84,42 H96 M42,12 V0 M42,84 V96" />
                <path d="M30,30 L18,18 M54,30 L66,18 M30,54 L18,66 M54,54 L66,66" />
              </g>
              <text x="0" y="150" textAnchor="middle" fontSize="28" fill="#cde8ee" fontWeight="600">Build Your Custom AI Agent</text>
            </g>

            {/* Step 3: Launch & Scale */}
            <g transform="translate(1480,430)">
              <circle r="90" fill="url(#node)" filter="url(#glow)" className="node-pulse-strong" />
              {/* Rocket + growth */}
              <g transform="translate(-30,-30)" fill="#E8F6F8">
                <path d="M30,0 C60,12 72,24 72,48 C72,64 60,72 48,76 L36,48 Z" />
                <rect x="16" y="48" width="20" height="28" rx="6" />
                <path d="M0,84 C10,68 28,68 38,84" opacity="0.85" />
              </g>
              <g transform="translate(70,70)" stroke="#E8F6F8" strokeWidth="6" fill="none">
                <path d="M0,40 L40,0" />
                <path d="M20,40 L60,10" opacity="0.7" />
              </g>
              <text x="0" y="150" textAnchor="middle" fontSize="28" fill="#cde8ee" fontWeight="600">Launch & Scale</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
