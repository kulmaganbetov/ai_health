"use client";

import { motion } from "framer-motion";
import SleepChart from "../components/SleepChart";
import { last30DaysSleep } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function SleepPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">Ұйқы аналитикасы</h1>
        <p className="text-sm text-white/50 mt-0.5">30 күндік ұйқы деректеріңіз</p>
      </motion.div>

      <SleepChart />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">30 күндік ұйқы ұзақтығы</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={last30DaysSleep} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} tickLine={false} axisLine={false} interval={4} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} unit="ч" domain={[4, 10]} />
              <Tooltip
                contentStyle={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                labelStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}
                itemStyle={{ color: "#8b5cf6", fontSize: 12 }}
              />
              <Line type="monotone" dataKey="duration" name="Ұйқы ұзақтығы (сағ)" stroke="#8b5cf6" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#8b5cf6" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
