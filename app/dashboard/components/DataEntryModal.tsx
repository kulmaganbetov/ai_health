"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Footprints, Moon, Activity, CheckCircle } from "lucide-react";
import { useData } from "@/lib/dataContext";

type Tab = "heart" | "activity" | "sleep" | "bp";

interface Props {
  open: boolean;
  onClose: () => void;
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  color = "blue",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  color?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const colors: Record<string, string> = {
    blue: "from-blue-500 to-cyan-500",
    rose: "from-rose-500 to-pink-500",
    violet: "from-violet-500 to-purple-500",
    emerald: "from-emerald-500 to-teal-500",
    amber: "from-amber-500 to-orange-500",
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm text-white/60">{label}</label>
        <span className={`text-lg font-bold bg-gradient-to-r ${colors[color]} bg-clip-text text-transparent`}>
          {value} <span className="text-xs font-normal text-white/40">{unit}</span>
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-white/10">
        <div
          className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${colors[color]} transition-all`}
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
      </div>
      <div className="flex justify-between text-xs text-white/20 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function DataEntryModal({ open, onClose }: Props) {
  const { addHeartRate, addActivity, addSleep, addBloodPressure } = useData();
  const [tab, setTab] = useState<Tab>("heart");
  const [success, setSuccess] = useState(false);

  // Heart Rate
  const [bpm, setBpm] = useState(72);

  // Activity
  const [steps, setSteps] = useState(8000);
  const [calories, setCalories] = useState(2000);
  const [activeMin, setActiveMin] = useState(45);

  // Sleep
  const [sleepDuration, setSleepDuration] = useState(7);
  const [sleepQuality, setSleepQuality] = useState(75);

  // Blood pressure
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  const handleSubmit = () => {
    if (tab === "heart") addHeartRate(bpm);
    else if (tab === "activity") addActivity({ steps, calories, activeMinutes: activeMin });
    else if (tab === "sleep") addSleep({ duration: sleepDuration, quality: sleepQuality });
    else if (tab === "bp") addBloodPressure({ systolic, diastolic });
    showSuccess();
  };

  const tabs: { id: Tab; label: string; icon: typeof Heart; color: string }[] = [
    { id: "heart", label: "Жүрек", icon: Heart, color: "text-rose-400" },
    { id: "activity", label: "Белсенділік", icon: Footprints, color: "text-emerald-400" },
    { id: "sleep", label: "Ұйқы", icon: Moon, color: "text-violet-400" },
    { id: "bp", label: "Қан қысымы", icon: Activity, color: "text-blue-400" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-md rounded-3xl border border-white/10 shadow-2xl pointer-events-auto overflow-hidden"
              style={{ background: "rgba(15, 23, 42, 0.98)", backdropFilter: "blur(30px)" }}
            >
              {/* Success overlay */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/95 rounded-3xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                    >
                      <CheckCircle size={64} className="text-emerald-400" />
                    </motion.div>
                    <p className="text-white font-semibold mt-4 text-lg">Сақталды!</p>
                    <p className="text-white/50 text-sm mt-1">Деректер жаңартылды</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div>
                  <h2 className="text-base font-bold text-white">Деректер енгізу</h2>
                  <p className="text-xs text-white/40">Бүгінгі денсаулық деректерін жазыңыз</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white/80 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/5 px-4 pt-3">
                {tabs.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`flex-1 flex flex-col items-center gap-1 pb-3 text-xs font-medium transition-colors relative ${
                        tab === t.id ? t.color : "text-white/30 hover:text-white/50"
                      }`}
                    >
                      <Icon size={16} />
                      <span className="hidden sm:block">{t.label}</span>
                      {tab === t.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                <AnimatePresence mode="wait">
                  {tab === "heart" && (
                    <motion.div
                      key="heart"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-5"
                    >
                      <div className="text-center py-4">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="inline-flex p-4 rounded-2xl bg-rose-500/10 mb-3"
                        >
                          <Heart size={32} className="text-rose-400" />
                        </motion.div>
                        <p className="text-xs text-white/40">Жүрек соғу жиілігін енгізіңіз</p>
                      </div>
                      <SliderInput
                        label="Жүрек соғу жиілігі"
                        value={bpm}
                        onChange={setBpm}
                        min={40}
                        max={200}
                        unit="уд/мин"
                        color="rose"
                      />
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        {[
                          { label: "Тыныштық", range: "40–60", color: "text-blue-400" },
                          { label: "Қалыпты", range: "60–100", color: "text-emerald-400" },
                          { label: "Жоғары", range: "100+", color: "text-rose-400" },
                        ].map((zone) => (
                          <div key={zone.label} className="p-2 rounded-lg bg-white/5">
                            <div className={`font-medium ${zone.color}`}>{zone.range}</div>
                            <div className="text-white/30">{zone.label}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {tab === "activity" && (
                    <motion.div
                      key="activity"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-5"
                    >
                      <SliderInput label="Қадам саны" value={steps} onChange={setSteps} min={0} max={30000} step={100} unit="қадам" color="emerald" />
                      <SliderInput label="Жанған калориялар" value={calories} onChange={setCalories} min={1200} max={5000} step={50} unit="ккал" color="amber" />
                      <SliderInput label="Белсенді уақыт" value={activeMin} onChange={setActiveMin} min={0} max={300} unit="мин" color="blue" />
                    </motion.div>
                  )}

                  {tab === "sleep" && (
                    <motion.div
                      key="sleep"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-5"
                    >
                      <SliderInput label="Ұйқы ұзақтығы" value={sleepDuration} onChange={setSleepDuration} min={3} max={12} step={0.5} unit="сағат" color="violet" />
                      <SliderInput label="Ұйқы сапасы" value={sleepQuality} onChange={setSleepQuality} min={0} max={100} unit="/ 100" color="blue" />
                      <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                        <p className="text-xs text-violet-300">
                          💡 Ересектерге күніне <strong>7–9 сағат</strong> ұйықтау ұсынылады
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {tab === "bp" && (
                    <motion.div
                      key="bp"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-5"
                    >
                      <SliderInput label="Систолалық қысым" value={systolic} onChange={setSystolic} min={80} max={200} unit="мм рт.ст." color="rose" />
                      <SliderInput label="Диастолалық қысым" value={diastolic} onChange={setDiastolic} min={50} max={130} unit="мм рт.ст." color="blue" />
                      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <p className="text-xs text-blue-300">
                          ✅ Қалыпты қан қысымы: <strong>120/80 мм рт.ст.</strong>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-shadow"
                >
                  Сақтау
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
