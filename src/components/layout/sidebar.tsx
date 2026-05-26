"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Zap, Plug, Settings, LogOut, TrendingDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { AnimateList, AnimateItem } from "@/components/shared/motion";

const navItems = [
  { href: "/dashboard",    label: "Overview",      icon: BarChart3 },
  { href: "/audits",       label: "Audit Results", icon: Zap },
  { href: "/integrations", label: "Integrations",  icon: Plug },
  { href: "/settings",     label: "Settings",      icon: Settings },
];

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

interface SidebarProps {
  email: string;
  fullName: string;
}

function initials(name: string, email: string): string {
  if (name.trim()) {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

function SidebarContent({ email, fullName, onNav }: SidebarProps & { onNav?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="px-4 py-5 border-b border-white/[0.06]"
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <TrendingDown className="w-3.5 h-3.5 text-background" />
          </span>
          <span className="font-semibold text-[15px] tracking-tight">Credex</span>
        </Link>
      </motion.div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5" aria-label="Main navigation">
        <AnimateList className="flex flex-col gap-0.5" stagger={0.06}>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <AnimateItem key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={onNav}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
                  )}
                >
                  <motion.span
                    whileHover={{ scale: 1.15, rotate: active ? 0 : 4 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="shrink-0"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </motion.span>
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                      transition={{ duration: 0.25, ease: EASE }}
                    />
                  )}
                </Link>
              </AnimateItem>
            );
          })}
        </AnimateList>
      </nav>

      {/* User */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
        className="px-3 py-4 border-t border-white/[0.06] flex items-center gap-3"
      >
        <Avatar className="w-8 h-8">
          <AvatarFallback className="text-xs bg-primary/20 text-primary font-semibold">
            {initials(fullName, email)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          {fullName && <p className="text-xs font-medium truncate">{fullName}</p>}
          <p className="text-[11px] text-muted-foreground truncate">{email}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.15 }}
          onClick={handleSignOut}
          aria-label="Sign out"
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
        </motion.button>
      </motion.div>
    </>
  );
}

export function Sidebar({ email, fullName }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 border-r border-white/[0.06] flex-col bg-background shrink-0">
        <SidebarContent email={email} fullName={fullName} />
      </aside>

      {/* Mobile: top bar + drawer */}
      <div className="md:hidden">
        {/* Top bar */}
        <div className="fixed top-0 inset-x-0 z-40 h-14 flex items-center justify-between px-4 border-b border-white/[0.06] bg-background/95 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <TrendingDown className="w-3 h-3 text-background" />
            </span>
            <span className="font-semibold text-sm tracking-tight">Credex</span>
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.12 }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Overlay + drawer via AnimatePresence */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-30 bg-black/50"
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
              />
              <motion.aside
                key="drawer"
                initial={{ x: reduce ? 0 : "-100%", opacity: reduce ? 0 : 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: reduce ? 0 : "-100%", opacity: reduce ? 0 : 1 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="fixed top-0 left-0 z-40 h-full w-64 bg-background border-r border-white/[0.06] flex flex-col"
                aria-label="Mobile navigation"
              >
                <SidebarContent
                  email={email}
                  fullName={fullName}
                  onNav={() => setMobileOpen(false)}
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
