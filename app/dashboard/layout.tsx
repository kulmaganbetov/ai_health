"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
  LogOut,
  User,
  Zap,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DataProvider } from "@/lib/dataContext";
import DataEntryModal from "./components/DataEntryModal";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Басты бет" },
  { href: "/dashboard/activity", icon: Activity, label: "Белсенділік" },
  { href: "/dashboard/sleep", icon: Moon, label: "Ұйқы" },
  { href: "/dashboard/heart", icon: Heart, label: "Жүрек метрикасы" },
  { href: "/dashboard/risk", icon: ShieldAlert, label: "Қауіп талдауы" },
];

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5 h-16">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <Zap size={14} className="text-white" />
        </div>
        {(!collapsed || isMobile) && (
          <span className="text-sm font-bold gradient-text">HealthAI</span>
        )}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/80 transition-colors flex-shrink-0"
          >
            <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronLeft size={14} />
            </motion.div>
          </button>
        )}
      </div>

      {/* Add data button */}
      <div className="px-3 pt-3">
        <button
          onClick={() => {
            setModalOpen(true);
            setMobileOpen(false);
          }}
          className={cn(
            "flex items-center gap-2 w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/20 text-blue-400 hover:from-blue-500/30 hover:to-violet-500/30 transition-all",
            collapsed && !isMobile ? "justify-center" : ""
          )}
        >
          <Plus size={14} className="flex-shrink-0" />
          {(!collapsed || isMobile) && (
            <span className="text-sm font-medium">Деректер жазу</span>
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin mt-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                collapsed && !isMobile ? "justify-center" : "",
                isActive
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId={isMobile ? "activeMobileNav" : "activeNav"}
                  className="absolute inset-0 rounded-xl bg-blue-500/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon size={16} className="flex-shrink-0 relative z-10" />
              {(!collapsed || isMobile) && (
                <span className="text-sm font-medium whitespace-nowrap relative z-10">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user area */}
      <div className="p-3 border-t border-white/5 space-y-1">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-white/50 hover:text-rose-400 hover:bg-rose-500/10 transition-colors",
            collapsed && !isMobile ? "justify-center" : ""
          )}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {(!collapsed || isMobile) && <span className="text-sm">Шығу</span>}
        </button>

        <div className={cn("flex items-center gap-3 px-3 py-2", collapsed && !isMobile ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-white" />
          </div>
          {(!collapsed || isMobile) && (
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-white truncate">Айбек Сейіт</div>
              <div className="text-xs text-white/40">Premium аккаунт</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "hsl(222, 47%, 4%)" }}>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 border-r border-white/5 overflow-hidden"
        style={{ background: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(20px)" }}
      >
        <Sidebar />
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
            <Sidebar isMobile />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        animate={{ marginLeft: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: 240 }}
      >
        {/* Adjust for mobile */}
        <style>{`@media (max-width: 767px) { .main-wrapper { margin-left: 0 !important; } }`}</style>

        {/* Top bar */}
        <header
          className="sticky top-0 z-30 border-b border-white/5 h-16 flex items-center px-4 gap-4"
          style={{ background: "rgba(10, 15, 28, 0.8)", backdropFilter: "blur(20px)" }}
        >
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/5 text-white/60"
          >
            <Menu size={18} />
          </button>

          <div className="flex-1 flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs text-white/60">Тікелей мониторинг</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors text-xs font-medium"
            >
              <Plus size={12} />
              Деректер жазу
            </button>
            <button className="relative p-2 rounded-xl hover:bg-white/5 text-white/60 hover:text-white/90 transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-400" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl hover:bg-rose-500/10 text-white/40 hover:text-rose-400 transition-colors"
              title="Шығу"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto main-wrapper">
          {children}
        </main>
      </motion.div>

      {/* Global data entry modal */}
      <DataEntryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </DataProvider>
  );
}
