"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Eye, EyeOff, Lock, User, AlertCircle, CheckCircle, UserPlus, AtSign } from "lucide-react";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "6+ символ", pass: password.length >= 6 },
    { label: "Сан бар", pass: /\d/.test(password) },
    { label: "Бас әріп бар", pass: /[A-Z]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const colors = ["bg-rose-500", "bg-amber-500", "bg-emerald-500"];
  const labels = ["Әлсіз", "Орташа", "Күшті"];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < score ? colors[score - 1] : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {checks.map((c) => (
            <div key={c.label} className={`flex items-center gap-1 text-xs ${c.pass ? "text-emerald-400" : "text-white/30"}`}>
              {c.pass ? <CheckCircle size={10} /> : <div className="w-2.5 h-2.5 rounded-full border border-current" />}
              {c.label}
            </div>
          ))}
        </div>
        {score > 0 && (
          <span className={`text-xs font-medium ${colors[score - 1].replace("bg-", "text-")}`}>
            {labels[score - 1]}
          </span>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", displayName: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Парольдер сәйкес келмейді");
      return;
    }
    if (form.password.length < 6) {
      setError("Пароль кемінде 6 символ болуы керек");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          displayName: form.displayName,
          password: form.password,
        }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Тіркеу кезінде қате пайда болды");
      }
    } catch {
      setError("Желі қатесі. Қайталап көріңіз.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      key: "username" as const,
      label: "Логин",
      placeholder: "mylogin123",
      icon: AtSign,
      type: "text",
      hint: "3–20 символ: латын әріптері, цифрлар немесе _",
    },
    {
      key: "displayName" as const,
      label: "Аты-жөні",
      placeholder: "Айбек Сейіт",
      icon: User,
      type: "text",
    },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "hsl(222, 47%, 4%)" }}
    >
      {/* Background orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12), transparent)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1), transparent)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center mb-4 shadow-2xl shadow-violet-500/30">
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">HealthAI</h1>
          <p className="text-white/50 text-sm mt-1">Жаңа аккаунт ашу</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-violet-500/10">
              <UserPlus size={18} className="text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Тіркелу</h2>
              <p className="text-xs text-white/40">Денсаулық деректерін бақылауды бастаңыз</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username + Display name */}
            {fields.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.key}>
                  <label className="block text-sm text-white/60 mb-1.5">{f.label}</label>
                  <div className="relative">
                    <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={set(f.key)}
                      placeholder={f.placeholder}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all text-sm"
                    />
                  </div>
                  {f.hint && <p className="text-xs text-white/25 mt-1">{f.hint}</p>}
                </div>
              );
            })}

            {/* Password */}
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Пароль</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all text-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Парольді растаңыз</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={set("confirm")}
                  placeholder="••••••••"
                  required
                  className={`w-full bg-white/5 border rounded-xl pl-10 pr-12 py-3 text-white placeholder-white/20 focus:outline-none focus:bg-white/8 transition-all text-sm ${
                    form.confirm && form.confirm !== form.password
                      ? "border-rose-500/50 focus:border-rose-500/70"
                      : form.confirm && form.confirm === form.password
                      ? "border-emerald-500/50 focus:border-emerald-500/70"
                      : "border-white/10 focus:border-violet-500/50"
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {form.confirm && form.confirm === form.password && (
                  <CheckCircle size={14} className="absolute right-10 top-1/2 -translate-y-1/2 text-emerald-400" />
                )}
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20"
                >
                  <AlertCircle size={14} className="text-rose-400 flex-shrink-0" />
                  <p className="text-xs text-rose-300">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Тіркелуде...
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Аккаунт ашу
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Login link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-white/40 mt-6"
        >
          Аккаунт бар ма?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Кіру
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
