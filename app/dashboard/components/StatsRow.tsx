"use client";

import { motion } from "framer-motion";
import { Heart, Droplets, Wind, Zap } from "lucide-react";
import { healthSummary } from "@/lib/mockData";

const stats = [
  {
    label: "Жүрек соғу",
    value: healthSummary.avgHeartRate,
    unit: "уд/мин",
    icon: Heart,
    color: "text-rose-400",
    bg: "from-rose-500/10 to-pink-500/10",
    border: "border-rose-500/20",
    change: "-3",
    positive: true,
  },
  {
    label: "HRV",
    value: healthSummary.avgHRV,
    unit: "мс",
    icon: Zap,
    color: "text-amber-400",
    bg: "from-amber-500/10 to-yellow-500/10",
    border: "border-amber-500/20",
    change: "+5",
    positive: true,
  },
  {
    label: "SpO2",
    value: healthSummary.avgSpo2.toFixed(1),
    unit: "%",
    icon: Wind,
    color: "text-cyan-400",
    bg: "from-cyan-500/10 to-blue-500/10",
    border: "border-cyan-500/20",
    change: "+0.2",
    positive: true,
  },
  {
    label: "Ұйқы",
    value: healthSummary.avgSleep,
    unit: "сағ",
    icon: Droplets,
    color: "text-violet-400",
    bg: "from-violet-500/10 to-purple-500/10",
    border: "border-violet-500/20",
    change: "+0.3",
    positive: true,
  },
];

export default function StatsRow() {
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
            className={`glass rounded-2xl p-4 bg-gradient-to-br ${stat.bg} border ${stat.border} cursor-default`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl bg-white/5`}>
                <Icon size={16} className={stat.color} />
              </div>
              <span className={`text-xs font-medium ${stat.positive ? "text-emerald-400" : "text-rose-400"}`}>
                {stat.change}
              </span>
            </div>
            <div className={`text-2xl font-bold ${stat.color} mb-0.5`}>
              {stat.value}
              <span className="text-sm font-normal text-white/40 ml-1">{stat.unit}</span>
            </div>
            <div className="text-xs text-white/50">{stat.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
