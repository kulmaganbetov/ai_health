"use client";

import { motion } from "framer-motion";
import RiskPanel from "../components/RiskPanel";
import BiologicalAge from "../components/BiologicalAge";

export default function RiskPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">Қауіп талдауы</h1>
        <p className="text-sm text-white/50 mt-0.5">AI негізіндегі денсаулық қауіп болжамы</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskPanel />
        <BiologicalAge />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Денсаулықты жақсарту ұсыныстары</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Ұйқы режимін сақтаңыз",
              desc: "Ұйқы апноэ қаупін азайту үшін күн сайын бір уақытта ұйықтаңыз",
              emoji: "😴",
              color: "border-violet-500/20 bg-violet-500/5",
            },
            {
              title: "Күнделікті жаяу жүріңіз",
              desc: "10,000 қадам жүру жүрек ауруы қаупін 20%-ға азайтады",
              emoji: "🚶",
              color: "border-emerald-500/20 bg-emerald-500/5",
            },
            {
              title: "Қан қысымын бақылаңыз",
              desc: "Тұзды азайтыңыз, гипертония қаупін төмендетіңіз",
              emoji: "💊",
              color: "border-blue-500/20 bg-blue-500/5",
            },
            {
              title: "Стрессті азайтыңыз",
              desc: "Медитация мен тыныс алу жаттығулары HRV-ді жақсартады",
              emoji: "🧘",
              color: "border-amber-500/20 bg-amber-500/5",
            },
          ].map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={`rounded-xl p-4 border ${tip.color}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tip.emoji}</span>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{tip.title}</h3>
                  <p className="text-xs text-white/50">{tip.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
