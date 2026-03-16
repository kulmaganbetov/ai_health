"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Activity,
  Moon,
  Heart,
  ShieldAlert,
  ChevronLeft,
  Menu,
  Bell,
  Settings,
  User,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Басты бет" },
  { href: "/dashboard/activity", icon: Activity, label: "Белсенділік" },
  { href: "/dashboard/sleep", icon: Moon, label: "Ұйқы" },
  { href: "/dashboard/heart", icon: Heart, label: "Жүрек метрикасы" },
  { href: "/dashboard/risk", icon: ShieldAlert, label: "Қауіп талдауы" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex" style={{ background: "hsl(222, 47%, 4%)" }}>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 border-r border-white/5"
        style={{ background: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(20px)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-white/5 h-16">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Zap size={14} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="text-sm font-bold gradient-text">HealthAI</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/80 transition-colors flex-shrink-0"
          >
            <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronLeft size={14} />
            </motion.div>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-blue-500/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={16} className="flex-shrink-0 relative z-10" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap relative z-10"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <Settings size={16} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">Баптаулар</span>}
          </button>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <User size={14} className="text-white" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="text-xs font-medium text-white truncate">Айбек Сейіт</div>
                <div className="text-xs text-white/40">Premium</div>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-60 z-40 flex flex-col md:hidden border-r border-white/5"
            style={{ background: "rgba(15, 23, 42, 0.98)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center gap-3 p-4 border-b border-white/5 h-16">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              <span className="text-sm font-bold gradient-text">HealthAI</span>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                      isActive
                        ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: 0 }}
      >
        <motion.div
          animate={{ marginLeft: collapsed ? 72 : 240 }}
          transition={{ duration: 0.3 }}
          className="hidden md:block"
          style={{ height: 0 }}
        />

        {/* Top bar */}
        <header
          className="sticky top-0 z-30 border-b border-white/5 h-16 flex items-center px-4 gap-4"
          style={{
            background: "rgba(10, 15, 28, 0.8)",
            backdropFilter: "blur(20px)",
          }}
        >
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/5 text-white/60"
          >
            <Menu size={18} />
          </button>

          <div className="flex-1 flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/60">Тікелей мониторинг</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-white/5 text-white/60 hover:text-white/90 transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-400" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer">
              <User size={14} className="text-white" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <motion.main
          animate={{ marginLeft: 0 }}
          className="flex-1 p-4 md:p-6 overflow-auto"
          style={{ marginLeft: 0 }}
        >
          <div className="md:ml-0">{children}</div>
        </motion.main>
      </div>

      {/* Hidden margin spacer for desktop */}
      <style>{`
        @media (min-width: 768px) {
          main {
            margin-left: ${collapsed ? "72px" : "240px"};
          }
        }
      `}</style>
    </div>
  );
}
