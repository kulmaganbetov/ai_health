"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { Heart, TrendingUp } from "lucide-react";
import { heartRateData, weeklyHeartRate, healthSummary } from "@/lib/mockData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-xl">
        <p className="text-white/60 text-xs mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-sm font-medium" style={{ color: p.color }}>
            {p.name}: {p.value} {p.name === "bpm" ? "уд/мин" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function HeartChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/10">
            <Heart size={18} className="text-rose-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Жүрек соғу жиілігі</h2>
            <p className="text-sm text-white/50">Бүгінгі күн (24 сағат)</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-rose-400">{healthSummary.avgHeartRate}</div>
          <div className="text-xs text-white/50">уд/мин орташа</div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={heartRateData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="time"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval={3}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              domain={[40, 110]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={60} stroke="rgba(59,130,246,0.2)" strokeDasharray="4 4" />
            <ReferenceLine y={100} stroke="rgba(239,68,68,0.2)" strokeDasharray="4 4" />
            <Area
              type="monotone"
              dataKey="bpm"
              name="bpm"
              stroke="#f43f5e"
              strokeWidth={2}
              fill="url(#heartGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "#f43f5e", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-white/70 mb-4 flex items-center gap-2">
          <TrendingUp size={14} className="text-blue-400" />
          HRV тренд (күн бойынша)
        </h3>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyHeartRate} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="time"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                domain={[50, 110]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="morning"
                name="Таң"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="afternoon"
                name="Күндіз"
                stroke="#a78bfa"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="evening"
                name="Кеш"
                stroke="#34d399"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-2 justify-center">
          {[
            { color: "#60a5fa", label: "Таң" },
            { color: "#a78bfa", label: "Күндіз" },
            { color: "#34d399", label: "Кеш" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
              <span className="text-xs text-white/50">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
