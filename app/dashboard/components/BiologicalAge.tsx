"use client";

import { motion } from "framer-motion";
import { Dna, ArrowDown, Sparkles } from "lucide-react";
import { healthSummary } from "@/lib/mockData";

export default function BiologicalAge() {
  const diff = healthSummary.chronologicalAge - healthSummary.biologicalAge;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20">
            <Dna size={18} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Биологиялық жас</h2>
            <p className="text-sm text-white/50">AI-ның денсаулық болжамы</p>
          </div>
        </div>

        <div className="flex items-center justify-center py-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl scale-150" />
            <div className="relative flex flex-col items-center justify-center w-36 h-36 rounded-full border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
              <motion.span
                className="text-5xl font-black gradient-text"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
              >
                {healthSummary.biologicalAge}
              </motion.span>
              <span className="text-xs text-white/50 mt-1">жас</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="text-center px-4 py-2 rounded-xl bg-white/5">
            <div className="text-xs text-white/40 mb-1">Нақты жас</div>
            <div className="text-xl font-bold text-white">{healthSummary.chronologicalAge}</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ArrowDown size={16} className="text-emerald-400" />
            <div className="flex items-center gap-1">
              <Sparkles size={10} className="text-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">-{diff} жас</span>
            </div>
          </div>
          <div className="text-center px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="text-xs text-emerald-400/60 mb-1">Биологиялық жас</div>
            <div className="text-xl font-bold text-emerald-400">{healthSummary.biologicalAge}</div>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 text-center">
          <p className="text-sm text-emerald-400 font-medium">
            🎉 Сіз жасыңыздан {diff} жасқа жас көрінесіз!
          </p>
          <p className="text-xs text-white/40 mt-1">
            Ұйқы, белсенділік және жүрек соғу жиілігі деректері негізінде
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "Ұйқы", score: "A+", color: "text-violet-400" },
            { label: "Белсенділік", score: "A", color: "text-blue-400" },
            { label: "Жүрек", score: "B+", color: "text-rose-400" },
          ].map((item) => (
            <div key={item.label} className="text-center p-2 rounded-lg bg-white/5">
              <div className={`text-lg font-bold ${item.color}`}>{item.score}</div>
              <div className="text-xs text-white/40">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
