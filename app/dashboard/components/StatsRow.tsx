"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Droplets, Wind, Zap } from "lucide-react";
import { useData } from "@/lib/dataContext";

export default function StatsRow() {
  const { latestStats, lastAddedType } = useData();

  const stats = [
    {
      label: "Жүрек соғу",
      value: latestStats.bpm,
      unit: "уд/мин",
      icon: Heart,
      color: "text-rose-400",
      bg: "from-rose-500/10 to-pink-500/10",
      border: "border-rose-500/20",
      highlight: lastAddedType === "heartRate",
    },
    {
      label: "HRV",
      value: 52,
      unit: "мс",
      icon: Zap,
      color: "text-amber-400",
      bg: "from-amber-500/10 to-yellow-500/10",
      border: "border-amber-500/20",
      highlight: false,
    },
    {
      label: "SpO2",
      value: "97.8",
      unit: "%",
      icon: Wind,
      color: "text-cyan-400",
      bg: "from-cyan-500/10 to-blue-500/10",
      border: "border-cyan-500/20",
      highlight: false,
    },
    {
      label: "Ұйқы",
      value: latestStats.sleepHours,
      unit: "сағ",
      icon: Droplets,
      color: "text-violet-400",
      bg: "from-violet-500/10 to-purple-500/10",
      border: "border-violet-500/20",
      highlight: lastAddedType === "sleep",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={`glass rounded-2xl p-4 bg-gradient-to-br ${stat.bg} border ${stat.border} cursor-default relative overflow-hidden transition-all duration-300 ${
              stat.highlight ? "ring-1 ring-emerald-400/30" : ""
            }`}
          >
            {stat.highlight && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 1.5, repeat: 2 }}
                className="absolute inset-0 bg-emerald-400/5 pointer-events-none"
              />
            )}
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-white/5">
                <Icon size={16} className={stat.color} />
              </div>
              <AnimatePresence>
                {stat.highlight && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-emerald-400 font-medium"
                  >
                    ✓ жаңа
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <motion.div
              key={`${stat.label}-${stat.value}`}
              initial={{ scale: 1.1, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-2xl font-bold ${stat.color} mb-0.5`}
            >
              {stat.value}
              <span className="text-sm font-normal text-white/40 ml-1">{stat.unit}</span>
            </motion.div>
            <div className="text-xs text-white/50">{stat.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
