"use client";

import { motion } from "framer-motion";
import ActivityChart from "../components/ActivityChart";
import StatsRow from "../components/StatsRow";
import { last30DaysActivity } from "@/lib/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";

export default function ActivityPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">Белсенділік аналитикасы</h1>
        <p className="text-sm text-white/50 mt-0.5">30 күндік белсенділік деректеріңіз</p>
      </motion.div>

      <StatsRow />

      <ActivityChart />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">30 күндік қадам тарихы</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last30DaysActivity} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} tickLine={false} axisLine={false} interval={4} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                labelStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}
                itemStyle={{ color: "#60a5fa", fontSize: 12 }}
              />
              <Bar dataKey="steps" name="Қадам" radius={[3, 3, 0, 0]} maxBarSize={20}>
                {last30DaysActivity.map((entry, i) => (
                  <Cell key={i} fill={entry.steps >= 10000 ? "#10b981" : entry.steps >= 7000 ? "#3b82f6" : "#6366f1"} fillOpacity={0.75} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
