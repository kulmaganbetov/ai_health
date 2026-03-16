"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Footprints, Moon, Activity, Plus, Trash2, Clock } from "lucide-react";
import { useData } from "@/lib/dataContext";

function LiveHeartBeat({ bpm }: { bpm: number }) {
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    const interval = 60000 / bpm;
    const timer = setInterval(() => {
      setBeat(true);
      setTimeout(() => setBeat(false), 150);
    }, interval);
    return () => clearInterval(timer);
  }, [bpm]);

  return (
    <motion.div
      animate={beat ? { scale: 1.3 } : { scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      <Heart size={16} className={`${beat ? "text-rose-300" : "text-rose-400"} transition-colors`} fill="currentColor" />
    </motion.div>
  );
}

function CurrentTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("kk-KZ", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return <span className="text-white/60 font-mono text-sm tabular-nums">{time}</span>;
}

export default function LiveMetrics({ onAddData }: { onAddData: () => void }) {
  const { latestStats, userData, lastAddedType, clearUserData } = useData();
  const [liveHR, setLiveHR] = useState(latestStats.bpm);
  const [showHistory, setShowHistory] = useState(false);

  // Simulate slight HR fluctuation
  useEffect(() => {
    const t = setInterval(() => {
      const base = latestStats.bpm;
      const fluctuation = Math.round((Math.random() - 0.5) * 4);
      setLiveHR(Math.max(50, Math.min(160, base + fluctuation)));
    }, 2500);
    return () => clearInterval(t);
  }, [latestStats.bpm]);

  const totalEntries =
    userData.heartRate.length +
    userData.activity.length +
    userData.sleep.length +
    userData.bloodPressure.length;

  return (
    <div className="space-y-4">
      {/* Live status bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-4 border border-white/5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs text-emerald-400 font-medium">ТІКЕЛЕЙ</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-white/30" />
              <CurrentTime />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {totalEntries > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-xs text-white/40 hover:text-white/70 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
              >
                {totalEntries} жазба
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white text-xs font-medium shadow-lg shadow-blue-500/20"
            >
              <Plus size={12} />
              Деректер жазу
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Live metrics cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Live HR */}
        <motion.div
          className="glass rounded-2xl p-4 border border-rose-500/20 bg-rose-500/5 relative overflow-hidden"
          animate={lastAddedType === "heartRate" ? { borderColor: "rgba(239,68,68,0.5)" } : {}}
        >
          <div className="absolute top-2 right-2">
            <LiveHeartBeat bpm={liveHR} />
          </div>
          <div className="text-xs text-white/40 mb-1">Тікелей ЖСЖ</div>
          <motion.div
            key={liveHR}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-2xl font-black text-rose-400 tabular-nums"
          >
            {liveHR}
          </motion.div>
          <div className="text-xs text-white/30">уд/мин</div>
          {lastAddedType === "heartRate" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-2 right-2 text-xs text-emerald-400"
            >
              ✓ жаңартылды
            </motion.div>
          )}
        </motion.div>

        {/* Steps */}
        <motion.div
          className="glass rounded-2xl p-4 border border-emerald-500/20 bg-emerald-500/5"
          animate={lastAddedType === "activity" ? { borderColor: "rgba(16,185,129,0.5)" } : {}}
        >
          <div className="absolute top-2 right-2">
            <Footprints size={14} className="text-emerald-400/50" />
          </div>
          <div className="text-xs text-white/40 mb-1">Қадам</div>
          <div className="text-2xl font-black text-emerald-400 tabular-nums">
            {latestStats.steps.toLocaleString()}
          </div>
          <div className="text-xs text-white/30">/ 10,000</div>
          <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (latestStats.steps / 10000) * 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Sleep */}
        <motion.div
          className="glass rounded-2xl p-4 border border-violet-500/20 bg-violet-500/5"
          animate={lastAddedType === "sleep" ? { borderColor: "rgba(139,92,246,0.5)" } : {}}
        >
          <div className="absolute top-2 right-2">
            <Moon size={14} className="text-violet-400/50" />
          </div>
          <div className="text-xs text-white/40 mb-1">Ұйқы</div>
          <div className="text-2xl font-black text-violet-400 tabular-nums">
            {latestStats.sleepHours}
          </div>
          <div className="text-xs text-white/30">сағат</div>
        </motion.div>

        {/* Blood pressure */}
        <motion.div
          className="glass rounded-2xl p-4 border border-blue-500/20 bg-blue-500/5"
          animate={lastAddedType === "bloodPressure" ? { borderColor: "rgba(59,130,246,0.5)" } : {}}
        >
          <div className="absolute top-2 right-2">
            <Activity size={14} className="text-blue-400/50" />
          </div>
          <div className="text-xs text-white/40 mb-1">Қан қысымы</div>
          <div className="text-xl font-black text-blue-400 tabular-nums">
            {latestStats.systolic}/{latestStats.diastolic}
          </div>
          <div className="text-xs text-white/30">мм рт.ст.</div>
        </motion.div>
      </div>

      {/* History panel */}
      <AnimatePresence>
        {showHistory && totalEntries > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-2xl p-4 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-white/70">Жазба тарихы</h3>
              <button
                onClick={clearUserData}
                className="flex items-center gap-1 text-xs text-rose-400/60 hover:text-rose-400 transition-colors"
              >
                <Trash2 size={12} />
                Тазалау
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin pr-1">
              {[...userData.heartRate].reverse().slice(0, 5).map((e) => (
                <div key={e.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <Heart size={10} className="text-rose-400" />
                    <span className="text-white/60">Жүрек соғуы</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-rose-400 font-medium">{e.bpm} уд/мин</span>
                    <span className="text-white/30">{e.time}</span>
                  </div>
                </div>
              ))}
              {[...userData.activity].reverse().slice(0, 5).map((e) => (
                <div key={e.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <Footprints size={10} className="text-emerald-400" />
                    <span className="text-white/60">Белсенділік</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-medium">{e.steps.toLocaleString()} қадам</span>
                    <span className="text-white/30">{e.date}</span>
                  </div>
                </div>
              ))}
              {[...userData.sleep].reverse().slice(0, 5).map((e) => (
                <div key={e.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <Moon size={10} className="text-violet-400" />
                    <span className="text-white/60">Ұйқы</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-violet-400 font-medium">{e.duration} сағ</span>
                    <span className="text-white/30">{e.date}</span>
                  </div>
                </div>
              ))}
              {[...userData.bloodPressure].reverse().slice(0, 5).map((e) => (
                <div key={e.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <Activity size={10} className="text-blue-400" />
                    <span className="text-white/60">Қан қысымы</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-medium">{e.systolic}/{e.diastolic}</span>
                    <span className="text-white/30">{e.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
