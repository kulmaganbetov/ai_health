"use client";

import { motion } from "framer-motion";
import { Heart, Moon, Activity, Brain } from "lucide-react";
import { healthSummary } from "@/lib/mockData";

const metrics = [
  {
    label: "Жүрек денсаулығы",
    value: healthSummary.heartHealth,
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
  },
  {
    label: "Ұйқы сапасы",
    value: healthSummary.sleepQuality,
    icon: Moon,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
  },
  {
    label: "Белсенділік деңгейі",
    value: healthSummary.activityLevel,
    icon: Activity,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
  },
  {
    label: "Стресс деңгейі",
    value: healthSummary.stressLevel,
    icon: Brain,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
  },
];

function CircularProgress({ value, size = 160 }: { value: number; size?: number }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="10"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-4xl font-bold gradient-text"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {value}
        </motion.span>
        <span className="text-xs text-white/50 mt-1">/ 100</span>
      </div>
    </div>
  );
}

export default function HealthScore() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6 card-glow"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Денсаулық скоры</h2>
          <p className="text-sm text-white/50">Жалпы денсаулық деңгейіңіз</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs text-emerald-400 font-medium">Жақсы</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex flex-col items-center">
          <CircularProgress value={healthSummary.healthScore} size={160} />
          <p className="mt-3 text-sm text-white/50">Денсаулық индексі</p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-xl p-4 bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 rounded-lg ${metric.bg}`}>
                    <Icon size={14} className={metric.text} />
                  </div>
                  <span className="text-xs text-white/60">{metric.label}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className={`text-2xl font-bold ${metric.text}`}>
                    {metric.value}
                  </span>
                  <span className="text-white/30 text-sm mb-0.5">%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
