"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ShieldAlert,
  Moon,
  Brain,
  ArrowRight,
  Zap,
  Watch,
  ChevronDown,
  Heart,
  TrendingUp,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Watch,
    title: "Киімдік деректерді синхрондау",
    desc: "Apple Watch, Garmin, Fitbit және басқа құрылғылармен деректерді автоматты синхрондайды",
    border: "border-blue-500/20",
    bg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: ShieldAlert,
    title: "Денсаулық қаупін болжау",
    desc: "Жүрек ауруы, диабет, гипертония қаупін ерте анықтайтын AI алгоритмдері",
    border: "border-violet-500/20",
    bg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    icon: Moon,
    title: "Ұйқы мен белсенділік аналитикасы",
    desc: "Ұйқы фазаларын, күнделікті белсенділікті және калория деректерін егжей-тегжейлі бақылайды",
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
  },
  {
    icon: Brain,
    title: "AI Денсаулық скоры",
    desc: "Барлық денсаулық деректерін біріктіріп, биологиялық жасты және жалпы денсаулық деңгейін есептейді",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
];

const steps = [
  {
    title: "Киімдік деректерді қосыңыз",
    desc: "Смарт сағатыңыздан немесе фитнес-трекерден деректерді жүктеңіз",
    icon: Watch,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Денсаулық метрикасын талдаңыз",
    desc: "AI алгоритмдері жүрек соғуы, ұйқы, белсенділік деректерін талдайды",
    icon: Activity,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    title: "AI қауіп болжамын алыңыз",
    desc: "Жеке денсаулық есебі мен ұсыныстарды алыңыз",
    icon: ShieldAlert,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

const stats = [
  { value: "98%", label: "Дәлдік деңгейі", icon: Star },
  { value: "50K+", label: "Белсенді қолданушы", icon: Heart },
  { value: "30+", label: "Денсаулық метрикасы", icon: Activity },
  { value: "4.9★", label: "Пайдаланушы бағасы", icon: TrendingUp },
];

function FloatingOrb({
  style,
  delay,
}: {
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ ...style, filter: "blur(80px)", opacity: 0.12 }}
      animate={{ y: [0, -25, 0], opacity: [0.08, 0.18, 0.08] }}
      transition={{ duration: 9 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "hsl(222, 47%, 4%)" }}>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
        style={{ background: "rgba(10, 15, 28, 0.8)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white">HealthAI</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Мүмкіндіктер</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Қалай жұмыс істейді</a>
            <a href="#stats" className="hover:text-white transition-colors">Статистика</a>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 text-sm font-medium transition-all"
          >
            Кіру
            <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <FloatingOrb style={{ left: "5%", top: "20%", width: 400, height: 400, background: "radial-gradient(circle, #3b82f6, transparent)" }} delay={0} />
        <FloatingOrb style={{ left: "65%", top: "5%", width: 300, height: 300, background: "radial-gradient(circle, #8b5cf6, transparent)" }} delay={2} />
        <FloatingOrb style={{ left: "40%", top: "55%", width: 350, height: 350, background: "radial-gradient(circle, #06b6d4, transparent)" }} delay={4} />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto pt-24 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8">
              <Zap size={12} />
              <span>AI негізіндегі денсаулық аналитикасы</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              AI{" "}
              <span className="gradient-text">Денсаулық</span>
              <br />
              Қауіп Анализаторы
            </h1>

            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Киімдік құрылғы деректерін пайдаланып денсаулығыңызды терең түсініңіз.
              Жүрек соғысы, ұйқы, белсенділік деректері негізінде AI қауіп болжамын алыңыз.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-base shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                >
                  <Zap size={18} />
                  Демо-режимді қосу
                </motion.button>
              </Link>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-white/10 text-white font-semibold text-base hover:border-white/20 transition-colors"
                >
                  <Activity size={18} />
                  Дашбордты көру
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(222,47%,4%)] to-transparent z-10 pointer-events-none" />
            <div className="glass rounded-3xl border border-white/10 p-4 overflow-hidden shadow-2xl shadow-blue-500/10 max-w-3xl mx-auto">
              <div className="grid grid-cols-4 gap-3 mb-3">
                {[
                  { label: "Жүрек", value: "72", unit: "уд/мин", color: "text-rose-400", bg: "bg-rose-500/10" },
                  { label: "HRV", value: "52", unit: "мс", color: "text-amber-400", bg: "bg-amber-500/10" },
                  { label: "SpO2", value: "97.8", unit: "%", color: "text-cyan-400", bg: "bg-cyan-500/10" },
                  { label: "Ұйқы", value: "7.3", unit: "сағ", color: "text-violet-400", bg: "bg-violet-500/10" },
                ].map((s) => (
                  <div key={s.label} className={`rounded-xl p-3 ${s.bg} border border-white/5`}>
                    <div className={`text-xl font-bold ${s.color}`}>{s.value}<span className="text-xs font-normal text-white/30 ml-0.5">{s.unit}</span></div>
                    <div className="text-xs text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 rounded-xl bg-white/3 border border-white/5 p-4 h-28 flex flex-col justify-between">
                  <div className="text-xs text-white/50">Денсаулық скоры</div>
                  <div className="text-5xl font-black gradient-text">82</div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                  </div>
                </div>
                <div className="rounded-xl bg-white/3 border border-white/5 p-4 h-28 flex flex-col">
                  <div className="text-xs text-white/50 mb-2">Биол. жас</div>
                  <div className="text-4xl font-black text-emerald-400">26</div>
                  <div className="text-xs text-white/30 mt-auto">Нақты: 30 жас</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 flex flex-col items-center text-white/30"
          >
            <span className="text-xs mb-2">Төмен қарай жылжыңыз</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronDown size={16} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 text-center hover:border-white/15 transition-colors"
                >
                  <div className="inline-flex p-3 rounded-xl bg-white/5 mb-4">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                  <div className="text-3xl font-black gradient-text">{stat.value}</div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Негізгі <span className="gradient-text">мүмкіндіктер</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Денсаулығыңызды толық бақылап, AI болжамдарын алыңыз
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`glass rounded-2xl p-6 border ${feat.border} cursor-default`}
                >
                  <div className={`inline-flex p-3 rounded-xl ${feat.bg} mb-4`}>
                    <Icon size={22} className={feat.iconColor} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Қалай <span className="gradient-text">жұмыс істейді?</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Тек 3 қадаммен денсаулық аналитикасын бастаңыз
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass rounded-2xl p-6 text-center relative"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {i + 1}
                  </div>
                  <div className={`inline-flex p-4 rounded-2xl ${step.bg} mb-4 mt-2`}>
                    <Icon size={28} className={step.color} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 border border-blue-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-violet-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="text-5xl mb-6">🏥</div>
              <h2 className="text-3xl font-black text-white mb-4">
                Денсаулығыңызды <span className="gradient-text">бүгіннен</span> бақылаңыз
              </h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                AI Денсаулық Аналитикасымен денсаулығыңыздың толық суретін алыңыз
              </p>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-bold text-lg shadow-2xl shadow-blue-500/30"
                >
                  <Zap size={20} />
                  Тегін бастаңыз
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap size={10} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white/60">HealthAI</span>
        </div>
        <p className="text-xs text-white/30">
          © 2024 HealthAI. Барлық деректер модельдік. Медициналық кеңес ретінде қабылдамаңыз.
        </p>
      </footer>
    </div>
  );
}
