"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Zap, Plug, Settings, LogOut, TrendingDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard",    label: "Overview",      icon: BarChart3 },
  { href: "/audits",       label: "Audit Results", icon: Zap },
  { href: "/integrations", label: "Integrations",  icon: Plug },
  { href: "/settings",     label: "Settings",      icon: Settings },
];

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
      <div className="px-4 py-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <TrendingDown className="w-3.5 h-3.5 text-background" />
          </span>
          <span className="font-semibold text-[15px] tracking-tight">Credex</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5" aria-label="Main navigation">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              onClick={onNav}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/[0.06] flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="text-xs bg-primary/20 text-primary font-semibold">
            {initials(fullName, email)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          {fullName && <p className="text-xs font-medium truncate">{fullName}</p>}
          <p className="text-[11px] text-muted-foreground truncate">{email}</p>
        </div>
        <button
          onClick={handleSignOut}
          aria-label="Sign out"
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}

export function Sidebar({ email, fullName }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Drawer overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Drawer panel */}
        <aside
          className={cn(
            "fixed top-0 left-0 z-40 h-full w-64 bg-background border-r border-white/[0.06] flex flex-col transition-transform duration-200",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
          aria-label="Mobile navigation"
        >
          <SidebarContent
            email={email}
            fullName={fullName}
            onNav={() => setMobileOpen(false)}
          />
        </aside>
      </div>
    </>
  );
}
