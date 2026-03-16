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
  LineChart,
  Line,
} from "recharts";
import { Moon, Star, TrendingUp } from "lucide-react";
import { useData } from "@/lib/dataContext";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-xl">
        <p className="text-white/60 text-xs mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-sm font-medium" style={{ color: p.fill || p.color }}>
            {p.name}: {typeof p.value === "number" ? p.value.toFixed(1) : p.value} сағ
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const sleepPhaseColors = {
  deep: "#8b5cf6",
  rem: "#3b82f6",
  light: "#06b6d4",
  awake: "#f59e0b",
};

export default function SleepChart() {
  const { mergedSleep, latestStats, userData } = useData();
  const last7 = mergedSleep.slice(-7);
  const hasUserData = userData.sleep.length > 0;

  const avgSleep = latestStats.sleepHours;
  const avgQuality = Math.round(last7.reduce((s, d) => s + d.quality, 0) / last7.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-violet-500/10">
            <Moon size={18} className="text-violet-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Ұйқы аналитикасы</h2>
            <p className="text-sm text-white/50">
              {hasUserData ? "Сіздің нақты деректеріңіз" : "Соңғы 7 күн"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <motion.div key={avgSleep} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-2xl font-bold text-violet-400">
            {avgSleep}ч
          </motion.div>
          <div className="text-xs text-white/50">орташа ұйқы</div>
        </div>
      </div>

      {hasUserData && (
        <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs text-violet-400">
            {userData.sleep.length} жеке ұйқы жазбасы қосылды
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl p-4 bg-violet-500/10 border border-violet-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Star size={14} className="text-violet-400" />
            <span className="text-xs text-white/60">Ұйқы сапасы</span>
          </div>
          <motion.div key={avgQuality} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-3xl font-bold text-violet-400">
            {avgQuality}
          </motion.div>
          <div className="text-xs text-white/40">/ 100</div>
        </div>
        <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={14} className="text-blue-400" />
            <span className="text-xs text-white/60">Орташа ұзақтық</span>
          </div>
          <motion.div key={avgSleep} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-3xl font-bold text-blue-400">
            {avgSleep}
          </motion.div>
          <div className="text-xs text-white/40">сағат / түн</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm text-white/60 mb-3">Ұйқы фазалары</h3>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last7} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} unit="ч" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="deep" name="Терең" stackId="sleep" fill={sleepPhaseColors.deep} fillOpacity={0.85} maxBarSize={40} />
              <Bar dataKey="rem" name="REM" stackId="sleep" fill={sleepPhaseColors.rem} fillOpacity={0.85} maxBarSize={40} />
              <Bar dataKey="light" name="Жеңіл" stackId="sleep" fill={sleepPhaseColors.light} fillOpacity={0.85} maxBarSize={40} />
              <Bar dataKey="awake" name="Оянып" stackId="sleep" fill={sleepPhaseColors.awake} fillOpacity={0.85} radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-2 flex-wrap">
          {[
            { color: sleepPhaseColors.deep, label: "Терең ұйқы" },
            { color: sleepPhaseColors.rem, label: "REM" },
            { color: sleepPhaseColors.light, label: "Жеңіл ұйқы" },
            { color: sleepPhaseColors.awake, label: "Оянып тұру" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
              <span className="text-xs text-white/50">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm text-white/60 mb-3">Ұйқы сапасы индексі</h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={last7} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} domain={[50, 100]} />
              <Tooltip
                contentStyle={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                labelStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}
                itemStyle={{ color: "#a78bfa", fontSize: 12 }}
              />
              <Line type="monotone" dataKey="quality" name="Сапа индексі" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 3, stroke: "#fff", strokeWidth: 1.5 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
