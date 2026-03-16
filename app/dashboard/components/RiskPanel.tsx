"use client";

import { motion } from "framer-motion";
import { ShieldAlert, TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { riskPredictions } from "@/lib/mockData";

const riskConfig = {
  low: {
    label: "Төмен",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    bar: "from-emerald-500 to-teal-400",
    glow: "shadow-emerald-500/10",
  },
  moderate: {
    label: "Орташа",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    bar: "from-amber-500 to-orange-400",
    glow: "shadow-amber-500/10",
  },
  high: {
    label: "Жоғары",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    bar: "from-rose-500 to-red-400",
    glow: "shadow-rose-500/10",
  },
};

function TrendIcon({ trend }: { trend: number }) {
  if (trend > 0) return <TrendingUp size={12} className="text-rose-400" />;
  if (trend < 0) return <TrendingDown size={12} className="text-emerald-400" />;
  return <Minus size={12} className="text-white/30" />;
}

export default function RiskPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass rounded-2xl p-6 card-glow"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10">
            <ShieldAlert size={18} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">AI Денсаулық қауіп бағалауы</h2>
            <p className="text-sm text-white/50">Мойындалған деректер негізіндегі болжам</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-white/30 hover:text-white/60 cursor-pointer transition-colors">
          <Info size={14} />
          <span className="text-xs">Ескерту</span>
        </div>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 mb-6">
        <p className="text-xs text-white/50 leading-relaxed">
          ⚠️ Бұл болжамдар тек ақпараттық мақсатта. Медициналық диагноз ретінде қабылдамаңыз.
          Нақты денсаулық мәселелері үшін дәрігерге хабарласыңыз.
        </p>
      </div>

      <div className="space-y-4">
        {riskPredictions.map((risk, i) => {
          const config = riskConfig[risk.level];
          return (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`rounded-xl p-4 border ${config.border} ${config.bg} shadow-lg ${config.glow}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{risk.nameKz}</span>
                    <div className="flex items-center gap-0.5">
                      <TrendIcon trend={risk.trend} />
                      {risk.trend !== 0 && (
                        <span className={`text-xs ${risk.trend > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                          {Math.abs(risk.trend)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-white/40">{risk.description}</p>
                </div>
                <div className="ml-4 text-right">
                  <div className={`text-2xl font-bold ${config.color}`}>{risk.risk}%</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} border ${config.border} mt-1`}>
                    {config.label}
                  </div>
                </div>
              </div>
              <div className="h-2 rounded-full bg-black/20 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${config.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${risk.risk}%` }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-white/3 border border-white/5">
        <h3 className="text-sm font-medium text-white mb-3">Қауіп деңгейлері</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { level: "low", label: "Төмен", range: "0–25%", config: riskConfig.low },
            { level: "moderate", label: "Орташа", range: "25–50%", config: riskConfig.moderate },
            { level: "high", label: "Жоғары", range: "50%+", config: riskConfig.high },
          ].map((item) => (
            <div key={item.level} className="text-center">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.config.bar} mx-auto mb-1`} />
              <div className={`text-xs font-medium ${item.config.color}`}>{item.label}</div>
              <div className="text-xs text-white/30">{item.range}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
