"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Footprints, Flame, Clock } from "lucide-react";
import { useData } from "@/lib/dataContext";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-xl">
        <p className="text-white/60 text-xs mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-sm font-medium" style={{ color: p.fill || p.color }}>
            {p.name}: {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ActivityChart() {
  const { mergedActivity, latestStats, userData } = useData();
  const goal = 10000;
  const last7 = mergedActivity.slice(-7);
  const hasUserData = userData.activity.length > 0;

  const avgSteps = Math.round(last7.reduce((s, d) => s + d.steps, 0) / last7.length);

  const stats = [
    { label: "Орташа қадам", value: avgSteps.toLocaleString(), unit: "қадам", icon: Footprints, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Калория", value: latestStats.bpm > 0 ? Math.round(latestStats.steps * 0.04 + 1400).toLocaleString() : "2,180", unit: "ккал", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Белсенді уақыт", value: userData.activity.length > 0 ? String(userData.activity[userData.activity.length - 1].activeMinutes) : "48", unit: "мин", icon: Clock, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10">
            <Footprints size={18} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Белсенділік аналитикасы</h2>
            <p className="text-sm text-white/50">
              {hasUserData ? "Сіздің нақты деректеріңіз" : "Соңғы 7 күн"}
            </p>
          </div>
        </div>
      </div>

      {hasUserData && (
        <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400">
            {userData.activity.length} жеке жазба қосылды
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-xl p-3 bg-white/5 border border-white/5 text-center"
            >
              <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-2`}>
                <Icon size={14} className={stat.color} />
              </div>
              <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-white/40">{stat.unit}</div>
              <div className="text-xs text-white/30 mt-0.5">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/60">Күнделікті қадам мақсаты</span>
          <span className="text-sm font-medium text-emerald-400">
            {latestStats.steps.toLocaleString()} / {goal.toLocaleString()}
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (latestStats.steps / goal) * 100)}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={last7} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="steps" name="Қадам" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {last7.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.steps >= goal ? "#10b981" : entry.steps >= 7000 ? "#3b82f6" : "#6366f1"}
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <h3 className="text-sm text-white/60 mb-3">Жанған калориялар</h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last7} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="calories" name="Калория" radius={[4, 4, 0, 0]} fill="#f97316" fillOpacity={0.7} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
