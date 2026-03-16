"use client";

import { motion } from "framer-motion";
import HealthScore from "./components/HealthScore";
import HeartChart from "./components/HeartChart";
import ActivityChart from "./components/ActivityChart";
import SleepChart from "./components/SleepChart";
import RiskPanel from "./components/RiskPanel";
import BiologicalAge from "./components/BiologicalAge";
import StatsRow from "./components/StatsRow";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Денсаулық бақылауы</h1>
          <p className="text-sm text-white/50 mt-0.5">Қош келдіңіз, Айбек! Бүгін денсаулығыңыз жақсы.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-white/40">
          <span>Соңғы жаңарту:</span>
          <span className="text-white/60">Қазір</span>
        </div>
      </motion.div>

      {/* Quick stats */}
      <StatsRow />

      {/* Health Score + Biological Age */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <HealthScore />
        </div>
        <BiologicalAge />
      </div>

      {/* Heart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeartChart />
        <ActivityChart />
      </div>

      {/* Sleep + Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SleepChart />
        <RiskPanel />
      </div>
    </div>
  );
}
